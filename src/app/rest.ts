/* eslint-disable */

export interface DoppelEinsatzDTO {
  otherVerein: VereinSelectionDTO;
  mitspielerName: string;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}

export interface JudgeReportDTO {
  id: number;
  modul: string;
  klasse?: string;
  besetzung?: string;
  location: string;
  verein: string;
  dirigent: string;
  programmTitel?: string;
  programmInfo?: string;
  minDurationInSeconds?: number;
  maxDurationInSeconds?: number;
  score?: number;
  status: JudgeReportStatus;
  titles: JudgeReportTitleDTO[];
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
  status: JudgeReportStatus;
}

export interface JudgeReportRatingDTO {
  category: JudgeReportCategory;
  categoryDescription: string;
  comment?: string;
  rating: JudgeReportCategoryRating;
}

export interface JudgeReportTitleDTO {
  titel: TitelDTO;
  comment?: string;
  ratings: JudgeReportRatingDTO[];
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

export interface LocationDTO {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  googleMapsAddress: string;
  googleMapsCoordinates: string;
  type: LocationType;
  capacity: string;
  modules: string;
  einspiellokal?: LocationDTO;
  instrumentendepot?: LocationDTO;
  juryfeedback?: LocationDTO;
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

export interface TitelDTO extends IsValid {
  id?: number;
  modul?: Modul;
  titelName?: string;
  composer?: string;
  arrangeur?: string;
  grad?: number;
  schwierigkeitsgrad?: string;
  durationInSeconds: number;
  pflichtStueck: boolean;
  infoModeration?: string;
}

export interface VereinDTO {
  email: string;
  angaben: VereinsangabenDTO;
  doppelEinsatz: DoppelEinsatzDTO[];
  praesident: KontaktDTO;
  direktion: KontaktDTO;
  anmeldung: VereinsanmeldungDTO;
  info: VereinsinfoDTO;
  registrationConfirmed: boolean;
  programme: VereinProgrammDTO[];
  phase2Status: PhaseStatus;
  phase1Status: PhaseStatus;
}

export interface VereinProgrammDTO extends IsValid {
  id: number;
  modul: Modul;
  modulDescription: string;
  klasse?: string;
  besetzung?: string;
  titel?: string;
  infoModeration?: string;
  totalDurationInSeconds?: number;
  minDurationInSeconds?: number;
  maxDurationInSeconds?: number;
  ablauf: VereinProgrammTitelDTO[];
  tambourenKatA: boolean;
  tambourenKatB: boolean;
  tambourenKatC: boolean;
  tambourenKatAGrundlage1?: TambourenGrundlage;
  tambourenKatAGrundlage2?: TambourenGrundlage;
  tambourenKatATitel1: TitelDTO;
  tambourenKatATitel2: TitelDTO;
  tambourenKatBTitel: TitelDTO;
  tambourenKatCTitel: TitelDTO;
  unterhaltungPA: boolean;
  unterhaltungEGitarre: boolean;
  unterhaltungEBass: boolean;
  unterhaltungKeyboard: boolean;
  unterhaltungGesang: boolean;
  parademusikTitel1: TitelDTO;
  parademusikTitel2: TitelDTO;
}

export interface VereinProgrammTitelDTO {
  titel: TitelDTO;
  applausInSeconds?: number;
}

export interface VereinSelectionDTO {
  id: number;
  name: string;
}

export interface VereinTeilnahmeDTO {
  name: string;
  logoImgId?: number;
  bildImgId?: number;
  homepage?: string;
  websiteText?: string;
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
  tambourenKatA: boolean;
  tambourenKatB: boolean;
  tambourenKatC: boolean;
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

export interface JuryLoginCreateDTO {
  name: string;
  email: string;
  password: string;
}

export interface UserCreateDTO {
  email: string;
  role: UserRole;
  password: string;
}

export interface UserDTO {
  email: string;
  role: UserRole;
  lastLogin?: DateAsString;
}

export interface VereinCommentCreateDTO {
  comment: string;
}

export interface VereinCommentDTO {
  comment: string;
  createdAt: DateAsString;
  createdBy: string;
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
  tambourenKatA: boolean;
  tambourenKatB: boolean;
  tambourenKatC: boolean;
  harmonie: boolean;
  brassBand: boolean;
  fanfare: boolean;
  tambouren: boolean;
  perkussionsensemble: boolean;
  registrationConfirmed: boolean;
  phase1: PhaseStatus;
  phase2: PhaseStatus;
  hasComments: boolean;
}

export interface IsValid {
  valid: boolean;
}

export type DateAsString = string;

export enum JudgeReportStatus {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum JudgeReportCategory {
  STIMMUNG_INTONATION = "STIMMUNG_INTONATION",
  RHYTHMUS_METRUM = "RHYTHMUS_METRUM",
  DYNAMIK_KLANGAUSGLEICH = "DYNAMIK_KLANGAUSGLEICH",
  TONKULTUR_TECHNIK_ARTIKULATION = "TONKULTUR_TECHNIK_ARTIKULATION",
  MUSIKALISCHER_AUSDRUCK = "MUSIKALISCHER_AUSDRUCK",
  INTERPRETATION = "INTERPRETATION",
}

export enum JudgeReportCategoryRating {
  NEGATIVE = "NEGATIVE",
  NEUTRAL = "NEUTRAL",
  POSITIVE = "POSITIVE",
}

export enum LocationType {
  PARADEMUSIK = "PARADEMUSIK",
  EINSPIELLOKAL = "EINSPIELLOKAL",
  INSTRUMENTENDEPOT = "INSTRUMENTENDEPOT",
  WETTSPIELLOKAL = "WETTSPIELLOKAL",
  JURYFEEDBACK = "JURYFEEDBACK",
}

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
  MODERATION = "MODERATION",
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

export enum PhaseStatus {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum TambourenGrundlage {
  WIRBEL = "WIRBEL",
  RUF = "RUF",
  BATAFLAFLA = "BATAFLAFLA",
  DOUBLE = "DOUBLE",
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

export enum Besetzung {
  HARMONIE = "HARMONIE",
  BRASS_BAND = "BRASS_BAND",
  FANFARE = "FANFARE",
  TAMBOUREN = "TAMBOUREN",
  PERKUSSIONSENSEMBLE = "PERKUSSIONSENSEMBLE",
}
