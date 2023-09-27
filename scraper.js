import axios from "axios"
import dateTime from "dayjs"
import fs from "fs"

const scraper = async (sYear, eYear) => {
    console.info("Running")
    let time = dateTime().format("YYYY/MM/DD")
    let url = `https://api.myquran.com/v1/sholat/jadwal/1102`
    let dataJadwal = []
    for (let tahun = sYear; tahun < eYear; tahun++) {
        for (let bulan = 1; bulan < 13; bulan++) {
            for (let tanggal = 1; tanggal < 32; tanggal++) {
                try {
                    let sc = `${url}/${tahun}/${bulan}/${tanggal}`
                    let {data : getData} = await axios.get(sc)
                    if(getData.status == false || getData == null){
                        throw new Error(getData.message)
                    }
                    dataJadwal.push(getData?.data?.jadwal)
                } catch (err) {
                    console.info(`Tanggal : ${tanggal} / Bulan : ${bulan} / tahun : ${tahun} / limit : ${sYear} - ${err.message}`)
                }

            }
        }
    }
    fs.writeFileSync("result/jadwal_final.json", JSON.stringify(dataJadwal))
}

scraper5(2024,2026)
