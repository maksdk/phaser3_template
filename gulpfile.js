//@ts-check
const gulp = require("gulp");
const fs = require("fs");
const texturePacker = require("gulp-free-tex-packer");
const del = require("del");
const through = require("through2");

const BASE_PATH = "assets/";
const ATLASES_TMP_PATH = "assets/tmp/";
const WRITE_PATH = 'assets.js';

const ERRORS = {
    SAME_IMAGE_NAME: "Such name of image has already been created"
};

let ASSETS = {};

// упаковка картинок в атласы
gulp.task('pack-atlases', function() {
    return gulp.src(BASE_PATH  + "atlases/**/*.*")
        .pipe(texturePacker({
            textureName: "__atlas",
            width: 1024,
            height: 1024,
            fixedSize: false,
            padding: 2,
            allowRotation: false,
            detectIdentical: true,
            allowTrim: true,
            exporter: "Phaser3",
            removeFileExtension: true,
            prependFolderName: true
        }))
        .pipe(gulp.dest(ATLASES_TMP_PATH));
});


// парсинг всех атласов 
gulp.task("parse-atlases", function(done) {
    const files = fs.readdirSync(ATLASES_TMP_PATH);
    const jsons = files.filter((name => isJson(name)));
    const imgs = files.filter((name => isImage(name)));
    const names = jsons.map(path => getName(path));

    const atlases =  names.map((name, index) => {
        return {
            name: name, 
            src: `${ATLASES_TMP_PATH}${jsons[index]}`,
            img: `${ATLASES_TMP_PATH}${imgs[index]}`
        };
    });

    ASSETS.atlases = atlases;

    done(null);
});



// сохранение данных для всех картинок, которые лежат в атласах
// в формате: 
//      { 
//          [уникальное имя картинки]: { name, atlasName, src } 
//      } 
gulp.task("set-images-map", function(done) {
    const files = fs.readdirSync(ATLASES_TMP_PATH);
    const jsons = files.filter((name => isJson(name)));
    
    const textures = jsons.reduce((acc, filename )=> {
        const content = fs.readFileSync(`${ATLASES_TMP_PATH}${filename}`,'utf8');
        const parsedContent = JSON.parse(content);
        const { textures } = parsedContent;
        return [...acc, ...textures.map(tex => ({...tex, atlasName: getName(filename) })) ];
    }, []);

    const frames = textures.reduce((acc, tex) => {
        const { frames, atlasName } = tex;
        return [...acc, ...frames.map(frame => ({...frame, atlasName }))]
    }, []);

    const images = frames.reduce((acc, frame) => {
        const { filename, atlasName } = frame;

        if (acc[filename]) {
            done(ERRORS.SAME_IMAGE_NAME);
        }

        return [...acc, { name: filename, src: `${BASE_PATH}atlases/${filename}`, atlasName  }];
    }, []);

    const imagesMap = images.reduce((acc, img) => {
        const {name: imgName, atlasName, src } = img;

        if (acc[imgName]) {
            done(ERRORS.SAME_IMAGE_NAME);
        }

        return {...acc, [imgName]: { atlasName, name: imgName, src }};
    }, {});

    ASSETS.imagesMap = imagesMap;

    done(null);
});


// парсинг шрифтов 
gulp.task("parse-fonts", function (done) {
    const path = `${BASE_PATH}fonts`;
    const filenames = fs.readdirSync(path,'utf8');
    const fonts = filenames.map(filename => {
        return { 
            name: getName(filename), 
            src: `${path}/${filename}` 
        };
    });
    ASSETS.fonts = fonts;
    done(null);
});


// парсинг картинок лежащих не в атласах
gulp.task('parse-images', function () {
    ASSETS.images = [];

    return gulp.src(BASE_PATH + 'images/**/*.*')
        .pipe(through.obj(function (file, enc, cb) {
            var path = fixPath(file.relative.toString());
            var name = getName(path);

            if (ASSETS.imagesMap && ASSETS.imagesMap[name]) {
                cb(ERRORS.SAME_IMAGE_NAME);
            }

            ASSETS.images.push({ name, src: `${BASE_PATH}images/${path}`});

            cb(null)
        }));
});


// gulp.task('parse-images-loading-screen', function () {
//     ASSETS.imagesLoadingScreen = [];

//     return gulp.src(BASE_PATH + 'images-loading-screen/**/*.*')
//         .pipe(through.obj(function (file, enc, cb) {
//             var path = fixPath(file.relative.toString());
//             var name = getName(path);

//             if (ASSETS.imagesMap && ASSETS.imagesMap[name]) {
//                 cb(ERRORS.SAME_IMAGE_NAME);
//             }

//             ASSETS.imagesLoadingScreen.push({ name: "loading-screen/" + name, src: `${BASE_PATH}images-loading-screen/${path}`});

//             cb(null)
//         }));
// });

// запись всех ассетов 
gulp.task("write", function(done) {
    fs.writeFileSync(WRITE_PATH, 'export default' + JSON.stringify(ASSETS) + ';');
    ASSETS = {};
    done();
});

gulp.task('clear', function(cb) {
    return del([ATLASES_TMP_PATH]);
});

gulp.task("assets", gulp.series(
    "clear",
    "pack-atlases",
    "parse-atlases", 
    "set-images-map", 
    "parse-images",
    // "parse-images-loading-screen",
    "parse-fonts", 
    "write", 

    function(done) {
        done(null);
    }
));

function isJson(name) {
    return /.*\.json$/.test(name);
}

function isImage(name) {
    return /.*\.png|jpg$/.test(name);
}

function getName(path) {
    var name = path.split(".");
    name.pop();
    name = name.join(".");
    return name;
}


function fixPath(path) {
    return path.split("\\").join("/");
}