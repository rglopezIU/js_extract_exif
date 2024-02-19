// Imports
const getExif = require('exif-async');
const parseDMS = require('parse-dms');


// Entry Point Function
async function extractExif() {
    let gpsObject = await readExifData('china1.jpeg');
    console.log(gpsObject);

    let gpsDecimal = getGPSCoordinates(gpsObject);
    console.log(gpsDecimal);
    console.log(gpsDecimal.lat)
    console.log(gpsDecimal.lon);
}

// Call the Entry Point (not needed in GCF)
extractExif();

// Helper Functions
async function readExifData(localFile) {
    let exifData;

    try {
        exifData = await getExif(localFile);
        // console.log(exifData);
        // console.log(exifData.gps);
        // console.log(exifData.gps.GPSLatitude);
        return exifData.gps;
    } catch(err) {
        console.log(err);
        return null;
    }
}

function getGPSCoordinates(g) {
    // PARSE DMS needs a string in the format of:
    // 51:30:0.5486N 0:7:34.4503W
    // DEG:MIN:SECDIRECTION DEG:MIN:SECDIRECTION
    const latString = `${g.GPSLatitude[0]}:${g.GPSLatitude[1]}:${g.GPSLatitude[2]}${g.GPSLatitudeRef}`;
    const lonString = `${g.GPSLongitude[0]}:${g.GPSLongitude[1]}:${g.GPSLongitude[2]}${g.GPSLongitudeRef}`;

    const degCoords = parseDMS(`${latString} ${lonString}`);

    return degCoords;
}