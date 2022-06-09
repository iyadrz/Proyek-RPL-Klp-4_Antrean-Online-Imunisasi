module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const Biodata = sequelize.define("biodata_pasien", {
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    nama_anak: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_ayah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_ibu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    nik: {
      type: DataTypes.STRING,
    },
    nomor_telepon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kecamatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kelurahan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenis_kartu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomor_kartu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomor_kartu_berobat: {
      type: DataTypes.STRING,
    },
    jenis_imunisasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jadwal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    terverifikasi: {
      type: DataTypes.BOOLEAN,
    },
    sukses: {
      type: DataTypes.BOOLEAN,
    },
    verif_ulang: {
      type: DataTypes.BOOLEAN,
    },
    alasan: {
      type: DataTypes.STRING,
    },
    urutan_loket: {
      type: DataTypes.INTEGER,
    },
    nomor_antrean: {
      type: DataTypes.INTEGER,
    },
    selesai: {
      type: DataTypes.BOOLEAN,
    },
    dipanggil: {
      type: DataTypes.BOOLEAN,
    },
    estimasi: {
      type: DataTypes.DATE,
    },
    berhasil_dilayani: {
      type: DataTypes.BOOLEAN,
    },
    urutan_pelayanan: {
      type: DataTypes.INTEGER,
    },
    urutan_selesai: {
      type: DataTypes.INTEGER,
    },
    tunda: {
      type: DataTypes.INTEGER,
    },
    nonaktif: {
      type: DataTypes.BOOLEAN,
    },
  });
  return Biodata;
};
