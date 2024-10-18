export interface IGame {
	id: number;
	title: string;
	description: string;
	details: string;
	developer: string[];
	publisher: string[];
	platforms: string[];
	genres: string[];
	modes: string[];
	cover: string;
	artwork: string;
	releaseDates: ReleaseDate[];
	websiteLinks: WebsiteLink[];
	createdAt: string;
}

export interface ReleaseDate {
	platform: string;
	date: string;
}

export interface WebsiteLink {
	websiteName: string;
	websiteLink: string;
}
