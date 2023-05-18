/* eslint-disable */

export interface ForgotPasswordRequestDTO {
  email: string;
}

export interface JudgeReportDTO {
}

export interface JudgeReportOverviewDTO {
  id: number;
  verein: string;
  location: string;
  locationUrl: string;
  modul: string;
  klasse?: string;
  besetzung?: string;
  start: DateAsString;
  end: DateAsString;
}

export interface KontaktDTO extends IsValid {
  vorname?: string;
  nachname?: string;
  adresse?: string;
  plz?: number;
  ort?: string;
  email?: string;
  telefonPrivat?: string;
  telefonMobile?: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  email: string;
  role: UserRole;
  jwt: string;
}

export interface NewsletterRecipientDTO {
  vorname: string;
  name: string;
  email: string;
  subscribedAt: DateAsString;
  unsubscribedAt?: DateAsString;
}

export interface RegisterHelperRequestDTO {
  email: string;
  name: string;
  vorname: string;
  adresse: string;
  plzOrt: string;
  geburtsdatum: DateAsString;
  telefon: string;
  vereinszugehoerigkeit: string;
  aufgaben: Aufgaben[];
  anzahlEinsaetze: string;
  einsatzMittwoch: Einsatzzeit[];
  einsatzDonnerstag: Einsatzzeit[];
  einsatzFreitag: Einsatzzeit[];
  einsatzSamstag: Einsatzzeit[];
  einsatzSonntag: Einsatzzeit[];
  einsatzMontag: Einsatzzeit[];
  einsatzDienstag: Einsatzzeit[];
  groesseShirt: string;
  comment: string;
}

export interface RegisterNewsletterRequestDTO {
  vorname: string;
  name: string;
  email: string;
}

export interface RegisterVereinRequestDTO {
  email: string;
  password: string;
  vereinsname: string;
}

export interface ResetPasswordRequestDTO {
  email: string;
  token: string;
  newPassword: string;
}

export interface TitelDTO {
  id?: number;
  titelName?: string;
  composer?: string;
  arrangeur?: string;
  grad?: number;
  durationInSeconds: number;
  pflichtStueck: boolean;
}

export interface VereinDTO {
  email: string;
  angaben: VereinsangabenDTO;
  praesident: KontaktDTO;
  direktion: KontaktDTO;
  anmeldung: VereinsanmeldungDTO;
  info: VereinsinfoDTO;
  registrationConfirmed: boolean;
  titel: TitelDTO[];
  programme: VereinProgrammDTO[];
  phase1Status: PhaseStatus;
  phase2Status: PhaseStatus;
}

export interface VereinProgrammDTO {
  id: number;
  modul: string;
  klasse?: string;
  besetzung?: string;
  titel?: string;
  infoModeration?: string;
  totalDurationInSeconds?: number;
  minDurationInSeconds?: number;
  maxDurationInSeconds?: number;
  availableTitel: TitelDTO[];
  ablauf: VereinProgrammTitelDTO[];
}

export interface VereinProgrammTitelDTO {
  titel: TitelDTO;
  applausInSeconds?: number;
}

export interface VereinsangabenDTO extends IsValid {
  vereinsname?: string;
  adresse?: string;
  plz?: number;
  ort?: string;
  homepage?: string;
  iban?: string;
  direktionDoppeleinsatz: boolean;
  direktionDoppeleinsatzVerein?: string;
  mitspielerDoppeleinsatz: boolean;
}

export interface VereinsanmeldungDTO extends IsValid {
  modulA: boolean;
  modulB: boolean;
  modulC: boolean;
  modulD: boolean;
  modulE: boolean;
  modulF: boolean;
  modulG: boolean;
  modulH: boolean;
  klasseModulA?: Klasse;
  klasseModulB?: Klasse;
  klasseModulH?: Klasse;
  harmonie: boolean;
  brassBand: boolean;
  fanfare: boolean;
  tambouren: boolean;
  perkussionsensemble: boolean;
  module: Modul[];
  besetzungen: Besetzung[];
}

export interface VereinsinfoDTO extends IsValid {
  logoImgId?: number;
  bildImgId?: number;
  websiteText?: string;
}

export interface VerifyEmailRequestDTO {
  email: string;
  verification: string;
}

export interface VereinOverviewDTO {
  id: number;
  vereinsname: string;
  modulA: boolean;
  modulB: boolean;
  modulC: boolean;
  modulD: boolean;
  modulE: boolean;
  modulF: boolean;
  modulG: boolean;
  modulH: boolean;
  klasseModulA?: Klasse;
  klasseModulB?: Klasse;
  klasseModulH?: Klasse;
  harmonie: boolean;
  brassBand: boolean;
  fanfare: boolean;
  tambouren: boolean;
  perkussionsensemble: boolean;
  registrationConfirmed: boolean;
  phase1: PhaseStatus;
  phase2: PhaseStatus;
}

export interface IsValid {
  valid: boolean;
}

export type DateAsString = string;

export enum UserRole {
  VEREIN = "VEREIN",
  HELPER = "HELPER",
  PLANER = "PLANER",
  ADMIN = "ADMIN",
  JUDGE = "JUDGE",
}

export enum Aufgaben {
  EGAL = "EGAL",
  KOERPERLICH = "KOERPERLICH",
  MUSIKALISCH = "MUSIKALISCH",
  JURYSEKRETARIAT = "JURYSEKRETARIAT",
  SERVICE = "SERVICE",
  BUFFET = "BUFFET",
  KUECHE = "KUECHE",
  NACHSCHUB = "NACHSCHUB",
  AUSSENSTAND = "AUSSENSTAND",
  RAHMENPROGRAMM = "RAHMENPROGRAMM",
  AUFBAU = "AUFBAU",
  AUFSICHT = "AUFSICHT",
}

export enum Einsatzzeit {
  MORGEN = "MORGEN",
  MITTAG = "MITTAG",
  NACHMITTAG = "NACHMITTAG",
  ABEND = "ABEND",
  NACHT = "NACHT",
}

export enum PhaseStatus {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum Klasse {
  HOECHSTKLASSE = "HOECHSTKLASSE",
  KLASSE_1 = "KLASSE_1",
  KLASSE_2 = "KLASSE_2",
  KLASSE_3 = "KLASSE_3",
  KLASSE_4 = "KLASSE_4",
  OBERSTUFE = "OBERSTUFE",
  MITTELSTUFE = "MITTELSTUFE",
  UNTERSTUFE = "UNTERSTUFE",
}

export enum Modul {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
}

export enum Besetzung {
  HARMONIE = "HARMONIE",
  BRASS_BAND = "BRASS_BAND",
  FANFARE = "FANFARE",
  TAMBOUREN = "TAMBOUREN",
  PERKUSSIONSENSEMBLE = "PERKUSSIONSENSEMBLE",
}
