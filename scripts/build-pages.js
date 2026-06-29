const fs = require("fs");
const path = require("path");

// ======================================
// Daftar file yang akan dibuild
// ======================================

const files = [
  {
    from: "src/pages/index.html",
    to: "public/index.html",
  },
  {
    from: "src/js/main.js",
    to: "public/js/main.js",
  },
];

// ======================================
// Copy File
// ======================================

function copyFile(source, destination) {
  if (!fs.existsSync(source)) {
    console.error(`❌ Source file tidak ditemukan:\n${source}`);
    return;
  }

  // Pastikan folder tujuan ada
  fs.mkdirSync(path.dirname(destination), {
    recursive: true,
  });

  // Copy file
  fs.copyFileSync(source, destination);

  console.log(
    `✅ ${path.relative(process.cwd(), destination)} berhasil dibuild`,
  );
}

// ======================================
// Build Semua File
// ======================================

function buildAll() {
  files.forEach((file) => {
    copyFile(
      path.resolve(__dirname, "..", file.from),
      path.resolve(__dirname, "..", file.to),
    );
  });
}

// ======================================
// Build Pertama Kali
// ======================================

buildAll();

// ======================================
// Watch Mode
// ======================================

if (process.argv.includes("--watch")) {
  console.log("\n👀 Watching files...\n");

  files.forEach((file) => {
    const source = path.resolve(__dirname, "..", file.from);

    fs.watchFile(source, { interval: 300 }, () => {
      copyFile(source, path.resolve(__dirname, "..", file.to));
    });
  });
}
