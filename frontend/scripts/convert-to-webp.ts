import sharp from "sharp";
import fs from "fs";
import path from "path";

const publicDir = "./public";

const imagesToConvert = [
  "about-us-third.jpeg",
  "room-3.png",
  "room.jpg",
  "room-1.png",
  "room-4.png",
  "room-2.png",
  "about-us-first.jpeg",
  "about-us-fourth.jpeg",
  "about-us-fifth.jpeg",
  "about-us-sixth.jpeg",
  "about-us-second.jpeg",
  "about-us-eigth.jpeg",
  "about-us-seventh.jpeg",
  "bakery-hero.jpeg",
  "muffins.jpeg",
  "pastries.jpeg",
  "sweets.jpeg",
  "patties.jpeg",
];

async function convertToWebp(inputPath, outputPath, quality = 80) {
  try {
    const inputFile = path.join(publicDir, inputPath);
    const outputFile = path.join(publicDir, outputPath);

    if (!fs.existsSync(inputFile)) {
      console.log(`Skipping ${inputPath} - not found`);
      return;
    }

    const stats = fs.statSync(inputFile);
    const originalSize = (stats.size / 1024).toFixed(1);

    await sharp(inputFile)
      .webp({ quality })
      .toFile(outputFile);

    const newStats = fs.statSync(outputFile);
    const newSize = (newStats.size / 1024).toFixed(1);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

    console.log(
      `${inputPath}: ${originalSize}KB -> ${outputPath}: ${newSize}KB (saved ${savings}%)`
    );
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error.message);
  }
}

async function main() {
  console.log("Converting images to WebP...\n");

  for (const image of imagesToConvert) {
    const baseName = path.basename(image, path.extname(image));
    const outputName = `${baseName}.webp`;

    if (image.endsWith(".webp")) {
      console.log(`Skipping ${image} - already WebP`);
      continue;
    }

    await convertToWebp(image, outputName, 80);
  }

  console.log("\nDone!");
  console.log("\nNext steps:");
  console.log("1. Update HTML references to use .webp files");
  console.log("2. Update component imports to use .webp files");
  console.log("3. Run 'npm run build' to optimize with imagemin");
}

main();
