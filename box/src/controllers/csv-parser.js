const fs = require('fs');
const csv = require('csv-parser');
const { promisify } = require('util');

async function parse(path) {
    const readFile = promisify(fs.readFile);
    const stream = fs.createReadStream(path);
    stream.pause();

    const results = [];
    let summary = {
        total: 0,
        invalid: 0,
        MTN: 0,
        GLO: 0,
        AIRTEL: 0,
        ETISALAT: 0
    }

    try {
        stream
            .pipe(csv())
            .on('data', (data) => {
                summary.total++
                if (data._0.length === 13 && data._0.startsWith("234")) {
                    results.push({
                        phone: data._0,
                        network: "MTN",
                        delievered: false,
                    });
                }else{
                    summary.invalid++
                }

            });

        await new Promise((resolve, reject) => {
            stream.on('end', () => {
                resolve();
            });
            stream.on('error', reject);
            stream.resume();
        });


        return { ok: true, results, summary };
    } catch (error) {
        return { ok: false, error };
    }
}

module.exports = parse;
