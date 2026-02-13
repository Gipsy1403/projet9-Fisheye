// Importe PrismaClient depuis le client généré par Prisma
import { PrismaClient } from '../generated/prisma/client';

// Crée une instance de PrismaClient pour interagir avec la base de données
const prisma = new PrismaClient();

// Récupère tous les photographes dans la base de données
export const getAllPhotographers = () => prisma.photographer.findMany();

// Récupère un photographe spécifique en fonction de son identifiant
export const getPhotographer = (id) =>
	prisma.photographer.findUnique({
	where: { id }, // Filtre sur l'identifiant du photographe
	});

// Récupère tous les médias d’un photographe spécifique
export const getAllMediasForPhotographer = (photographerId) =>
	prisma.media.findMany({
	where: { photographerId }, // Filtre sur l'identifiant du photographe
	});

// Met à jour le nombre de likes d’un média spécifique
export const updateNumberOfLikes = (mediaId, newNumberOfLikes) =>
	prisma.media.update({
	where: { id: mediaId },       // Filtre sur l'identifiant du média
	data: { likes: newNumberOfLikes }, // Met à jour la valeur des likes
	});

// Calcule la somme totale des likes pour tous les médias d’un photographe
export const getTotalLikesForPhotographer = (photographerId) =>
	prisma.media.aggregate({
	where: { photographerId },   // Filtre sur l'identifiant du photographe
	_sum: { likes: true },        // Somme des likes
	});




