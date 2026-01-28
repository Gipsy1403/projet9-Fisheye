// On importe Prisma pour lire les données de la base
import { prisma } from "./prisma.js"

// fs permet de lire et renommer des fichiers sur le disque
import fs from "fs"

// path aide à construire des chemins de fichiers sans erreur
import path from "path"

/**
 * Cette fonction sert à "simplifier" un nom de fichier
 * Objectif : pouvoir comparer deux noms même s’ils sont écrits différemment
 */
function simplifyName(name) {
  return (
    name
      .toLowerCase()              // transforme tout en minuscules
      .replace(/[\s_-]/g, "")     // enlève espaces, _ et -
  )
}

/**
 * Fonction principale :
 * - lit les médias depuis Prisma
 * - renomme les fichiers dans public/assets
 */
async function renameAssets() {

  // On récupère tous les médias depuis la base de données
  const medias = await prisma.media.findMany()

  // On construit le chemin vers le dossier public/assets
  const assetsDir = path.join(process.cwd(), "public/assets")

  // On lit tous les fichiers présents dans le dossier assets
  const files = fs.readdirSync(assetsDir)

  // On parcourt chaque média un par un
  for (const media of medias) {

    // On prend le nom du fichier :
    // - image s’il existe
    // - sinon video
    const fileNameFromPrisma = media.image ?? media.video

    // Si le média n’a ni image ni vidéo, on passe au suivant
    if (!fileNameFromPrisma) {
      console.log(`⚠️ Média ${media.id} sans image ni vidéo`)
      continue
    }

    // On simplifie le nom venant de Prisma pour comparaison
    const simplifiedTarget = simplifyName(fileNameFromPrisma)

    // On cherche dans le dossier assets un fichier qui correspond
    const matchingFile = files.find(
      (file) => simplifyName(file) === simplifiedTarget
    )

    // Si aucun fichier ne correspond, on affiche un message
    if (!matchingFile) {
      console.log(`❌ Aucun fichier trouvé pour ${fileNameFromPrisma}`)
      continue
    }

    // Si le fichier a déjà exactement le bon nom, on ne fait rien
    if (matchingFile === fileNameFromPrisma) {
      console.log(`✔️ Déjà correct : ${fileNameFromPrisma}`)
      continue
    }

    // Chemin complet de l’ancien fichier
    const oldPath = path.join(assetsDir, matchingFile)

    // Chemin complet du nouveau fichier (nom venant de Prisma)
    const newPath = path.join(assetsDir, fileNameFromPrisma)

    // On renomme physiquement le fichier sur le disque
    fs.renameSync(oldPath, newPath)

    // Message pour confirmer le renommage
    console.log(`✅ ${matchingFile} → ${fileNameFromPrisma}`)
  }
}

// On lance la fonction
renameAssets()
