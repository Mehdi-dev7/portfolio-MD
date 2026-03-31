/**
 * Raison sociale ou nom commercial — affiché dans le footer et la section Contact.
 * Renseignez la chaîne ci-dessous, ou laissez vide et utilisez plutôt VITE_COMPANY_NAME
 * (variables d’environnement, ex. Netlify).
 */
const COMPANY_NAME_FROM_FILE = "";

export const COMPANY_NAME =
	COMPANY_NAME_FROM_FILE.trim() ||
	(import.meta.env.VITE_COMPANY_NAME ?? "").trim();
