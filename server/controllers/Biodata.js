const { biodata, sequelize } = require("../models");
const db = require("../models");
const Biodata = db.biodata;
const Op = db.Sequelize.Op;
const excel = require("exceljs");

// Create and Save a new Biodata
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.nama_anak) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Biodata
  const biodata = {
    nama_anak: req.body.nama_anak,
    nama_ayah: req.body.nama_ayah,
    nama_ibu: req.body.nama_ibu,
    tanggal_lahir: req.body.tanggal_lahir,
    nik: req.body.nik ? req.body.nik : "-",
    nomor_telepon: req.body.nomor_telepon,
    email: req.body.email ? req.body.email : "-",
    alamat: req.body.alamat,
    kecamatan: req.body.kecamatan,
    kelurahan: req.body.kelurahan,
    jenis_kartu: req.body.jenis_kartu,
    nomor_kartu: req.body.nomor_kartu ? req.body.nomor_kartu : "-",
    nomor_kartu_berobat: req.body.nomor_kartu_berobat
      ? req.body.nomor_kartu_berobat
      : "-",
    jenis_imunisasi: req.body.jenis_imunisasi,
    jadwal: req.body.jadwal,
    terverifikasi: req.body.terverifikasi ? req.body.terverifikasi : false,
    sukses: req.body.sukses ? req.body.sukses : false,
    verif_ulang: req.body.verif_ulang ? req.body.verif_ulang : false,
    alasan: req.body.alasan ? req.body.alasan : "",
    urutan_loket: req.body.urutan_loket ? req.body.urutan_loket : null,
    nomor_antrean: req.body.nomor_antrean ? req.body.nomor_antrean : null,
    selesai: req.body.selesai ? req.body.selesai : false,
    dipanggil: req.body.dipanggil ? req.body.dipanggil : false,
    estimasi: req.body.estimasi ? req.body.estimasi : null,
    berhasil_dilayani: req.body.berhasil_dilayani
      ? req.body.berhasil_dilayani
      : false,
    urutan_pelayanan: req.body.urutan_pelayanan ? req.body.urutan_pelayanan : 0,
    urutan_selesai: req.body.urutan_selesai ? req.body.urutan_selesai : 0,
    tunda: req.body.tunda ? req.body.tunda : 0,
    nonaktif: req.body.nonaktif ? req.body.nonaktif : false,
  };
  try {
    await Biodata.create(biodata);
    res.send(biodata);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating biodata.",
    });
  }
};

// Retrieve all Biodata from the database.
exports.findAll = async (req, res) => {
  try {
    const biodata = await Biodata.findAll({
      order: [
        ["dipanggil", "DESC"],
        ["nonaktif", "ASC"],
      ],
    });
    biodata.sort((a, b) => {
      const urutanA = a.urutan_pelayanan;
      const urutanB = b.urutan_pelayanan;

      if (a.dipanggil < b.dipanggil) {
        return 1;
      }
      if (a.nonaktif < b.nonaktif) {
        return -1;
      }
      if (urutanA === 0 && urutanB > 0) {
        return 1;
      }
      if (urutanA > 0 && urutanB === 0) {
        return -1;
      }
      if (urutanA === 0 && urutanB === 0) {
        if (a.urutan_loket < b.urutan_loket) return -1;
        if (a.urutan_loket > b.urutan_loket) return 1;
      }
      return urutanA - urutanB;
    });
    res.send(biodata);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving biodata.",
    });
  }
};

// Find a single Biodata with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const biodata = await Biodata.findByPk(id);
    if (biodata) {
      res.send({
        message: typeof biodata,
      });
    } else {
      res.status(404).send({
        message: `Cannot find Biodata with id=${id}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving Biodata with id=" + id,
    });
  }
};

exports.getAntrean = async (req, res) => {
  try {
    const biodata = await Biodata.findAll({
      attributes: [
        "urutan_pelayanan",
        "dipanggil",
        "updatedAt",
        "estimasi",
        "nomor_antrean",
        "berhasil_dilayani",
        "jadwal",
      ],
    });
    res.json(biodata);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error,
    });
  }
};

exports.downloadExcel = async (req, res) => {
  try {
    const biodata = await Biodata.findAll({
      attributes: [
        "createdAt",
        "nama_anak",
        "nama_ayah",
        "nama_ibu",
        "tanggal_lahir",
        "nik",
        "nomor_telepon",
        "email",
        "alamat",
        "kecamatan",
        "kelurahan",
        "jenis_kartu",
        "nomor_kartu",
        "nomor_kartu_berobat",
        "jenis_imunisasi",
        "jadwal",
        "terverifikasi",
        "sukses",
        "verif_ulang",
        "alasan",
        "nomor_antrean",
        "selesai",
        "berhasil_dilayani",
        "estimasi",
      ],
    });
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Data Antrean Pasien");
    worksheet.columns = [
      { header: "Waktu  Data Diterima", key: "createdAt", width: 25 },
      {
        header: "Nama Anak",
        key: "nama_anak",
        width: 40,
      },
      { header: "Nama Ayah", key: "nama_ayah", width: 30 },
      { header: "Nama Ibu", key: "nama_ibu", width: 30 },
      { header: "Tanggal Lahir", key: "tanggal_lahir", width: 30 },
      { header: "NIK Anak", key: "nik", width: 18 },
      { header: "Nomor WhatsApp", key: "nomor_telepon", width: 20 },
      { header: "Email", key: "email", width: 20 },
      { header: "Alamat", key: "alamat", width: 30 },
      { header: "Kecamatan", key: "kecamatan", width: 20 },
      { header: "Kelurahan", key: "kelurahan", width: 20 },
      { header: "Jenis Kartu", key: "jenis_kartu", width: 15 },
      { header: "Nomor Kartu", key: "nomor_kartu", width: 15 },
      { header: "Nomor Kartu Berobat", key: "nomor_kartu_berobat", width: 20 },
      { header: "Jenis Imunisasi", key: "jenis_imunisasi", width: 40 },
      { header: "Tanggal Imunisasi", key: "jadwal", width: 15 },
      { header: "Terverifikasi", key: "terverifikasi", width: 15 },
      { header: "Sukses Terverifikasi", key: "sukses", width: 15 },
      { header: "Verifikasi Ulang", key: "verif_ulang", width: 15 },
      { header: "Alasan Ditolak", key: "alasan", width: 25 },
      { header: "Nomor Antrean", key: "nomor_antrean", width: 15 },
      { header: "Selesai Diproses", key: "selesai", width: 15 },
      { header: "Berhasil Diproses", key: "berhasil_dilayani", width: 15 },
      { header: "Waktu Selesai", key: "estimasi", width: 25 },
    ];
    worksheet.addRows(biodata);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "Data_Antrean_Imunisasi.xlsx"
    );
    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error,
    });
  }
};

// Update a Biodata by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    await Biodata.update(req.body, {
      where: { id: id },
    });
    res.send({
      message: "Biodata was updated successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: error + id,
    });
  }
};

// Delete a Biodata with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Biodata.destroy({
      where: { selesai: true, 
              
      },
    });
    res.send({
      message: "Biodata was deleted successfully!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Could not delete Biodata with id=" + id,
    });
  }
};

// Delete all Biodata from the database.
// exports.deleteAll = async (req, res) => {
//   try {
//     await Biodata.destroy({
//       where: {},
//       truncate: false,
//     });
//     res.send({ message: `All Biodata were deleted successfully!` });
//   } catch (error) {
//     res.status(500).send({
//       message:
//         error.message || "Some error occurred while removing all biodata.",
//     });
//   }
// };
exports.deleteAll = async (req, res) => {
  try {
    await Biodata.destroy({
      where: {selesai: true},
    });
    res.send({ message: `Success!` });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while removing data.",
    });
  }
};

exports.patch = async (req, res) => {
  const id = req.params.id;
  try {
    const biodata = await Biodata.findByPk(id);
    const keyNames = Object.keys(req.body);
    keyNames.forEach((value) => {
      biodata.dataValues[value] = req.body[value];
    });
    // console.log(biodata.dataValues);
    Biodata.update(biodata.dataValues, {
      where: { id: id },
    });
    res.send({
      message: "Biodata was patched successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error patching Tutorial with id=" + id,
    });
  }
};
