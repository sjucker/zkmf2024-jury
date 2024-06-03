/* eslint-disable */

export interface AdhocOrchesterTeilnehmerDTO {
  name?: string;
  email?: string;
  instrument?: string;
}

export interface AppPageDTO {
  id: number;
  markdown: string;
  title: string;
  createdAt: DateAsString;
  news: boolean;
  cloudflareId?: string;
}

export interface ConfirmScoreDTO {
  vereinProgrammId: number;
  category?: JudgeReportModulCategory;
  score: number;
}

export interface CoordinatesDTO {
  latitude: number;
  longitude: number;
}

export interface CurrentTimetablePreviewDTO {
  current?: TimetablePreviewDTO;
  next?: TimetablePreviewDTO;
  sponsoren: SponsorDTO[];
  currentTime: DateAsString;
  emergencyMessage?: EmergencyMessageDTO;
}

export interface DoppelEinsatzDTO {
  otherVerein: VereinSelectionDTO;
  mitspielerName: string;
}

export interface EmergencyMessageDTO {
  id?: number;
  header: string;
  message: string;
  active: boolean;
}

export interface FestprogrammDayDTO {
  day: string;
  entries: FestprogrammEntryDTO[];
}

export interface FestprogrammEntryDTO {
  date: DateAsString;
  timeFrom: string;
  timeTo?: string;
  description: string;
  location: string;
  important: boolean;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}

export interface JudgePresentationDTO {
  name: string;
  modul: string;
  cloudflareId?: string;
  presentationText?: string;
}

export interface JudgeRankingEntryDTO {
  verein: string;
  score?: number;
}

export interface JudgeReportDTO {
  id: number;
  modul: Modul;
  modulDescription: string;
  judgeName: string;
  role: JudgeRole;
  roleDescription: string;
  klasse?: string;
  besetzung?: string;
  category?: JudgeReportModulCategory;
  categoryDescription?: string;
  start: DateAsString;
  end: DateAsString;
  location: string;
  verein: string;
  dirigent: string;
  programmTitel?: string;
  programmInfo?: string;
  minDurationInSeconds?: number;
  maxDurationInSeconds?: number;
  modulGKatA1?: string;
  modulGKatA2?: string;
  score?: number;
  ratingFixed: boolean;
  status: JudgeReportStatus;
  titles: JudgeReportTitleDTO[];
  overallRatings: JudgeReportRatingDTO[];
}

export interface JudgeReportOverviewDTO {
  id: number;
  verein: string;
  location: string;
  locationUrl: string;
  modul: Modul;
  modulDescription: string;
  role: JudgeRole;
  roleDescription: string;
  klasse?: string;
  besetzung?: string;
  category?: JudgeReportModulCategory;
  categoryDescription?: string;
  start: DateAsString;
  end: DateAsString;
  status: JudgeReportStatus;
}

export interface JudgeReportRatingDTO {
  category: JudgeReportCategory;
  categoryDescription: string;
  group: string;
  ratingDescriptions: string[];
  comment?: string;
  rating: JudgeReportCategoryRating;
  score?: number;
}

export interface JudgeReportScoreDTO {
  reportId: number;
  judgeEmail: string;
  judgeName: string;
  judgeRole: string;
  score?: number;
  ratingFixed: boolean;
  done: boolean;
}

export interface JudgeReportSummaryDTO {
  programmId: number;
  date: DateAsString;
  location: LocationDTO;
  modul: Modul;
  modulDescription: string;
  klasse?: Klasse;
  klasseDescription?: string;
  besetzung?: Besetzung;
  besetzungDescription?: string;
  category?: JudgeReportModulCategory;
  categoryDescription?: string;
  verein: string;
  overallScore?: number;
  penalty?: number;
  bonus?: number;
  scores: JudgeReportScoreDTO[];
  done: boolean;
  scoresConfirmed: boolean;
}

export interface JudgeReportTitleDTO {
  titel: TitelDTO;
  comment?: string;
  ratings: JudgeReportRatingDTO[];
}

export interface JudgeReportViewDTO {
  judge: string;
  modul: Modul;
  modulDescription: string;
  klasse?: string;
  besetzung?: string;
  category?: JudgeReportModulCategory;
  categoryDescription?: string;
  verein: string;
  score?: number;
  status: JudgeReportStatus;
  titles: JudgeReportTitleDTO[];
  overallRatings: JudgeReportRatingDTO[];
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
  id: number;
  identifier: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  googleMapsAddress: string;
  googleMapsCoordinates: string;
  type: LocationType;
  capacity: string;
  modules: string;
  sortOrder: number;
  mapId: string;
  cloudflareId?: string;
  kuulaId?: string;
  einspiellokal?: LocationDTO;
  instrumentendepotId?: number;
  instrumentendepotParademusikId?: number;
  instrumentendepot?: LocationDTO;
  juryfeedback?: LocationDTO;
  percussionEquipmentType?: PercussionEquipmentType;
  coordinates?: CoordinatesDTO;
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

export interface ModulDSelectionDTO {
  vereinProgrammId: number;
  verein: string;
  titel1: string;
  titel2: string;
  selection: ModulDSelection;
  start: DateAsString;
}

export interface NewsletterRecipientDTO {
  vorname: string;
  name: string;
  email: string;
  subscribedAt: DateAsString;
  unsubscribedAt?: DateAsString;
}

export interface NichtmitgliederDTO {
  amount?: number;
  instrument?: string;
}

export interface RankingBonusDTO {
  vereinProgrammId: number;
  bonus: number;
}

export interface RankingDTO {
  modul: string;
  score: number;
}

export interface RankingListDTO {
  id: number;
  modul: Modul;
  modulDescription: string;
  klasse?: Klasse;
  klasseDescription?: string;
  besetzung?: Besetzung;
  besetzungDescription?: string;
  category?: JudgeReportModulCategory;
  categoryDescription?: string;
  location: LocationDTO;
  description: string;
  status: RankingStatus;
  entries: RankingListEntryDTO[];
  final: boolean;
}

export interface RankingListEntryDTO {
  rank: number;
  vereinsName: string;
  score: number;
}

export interface RankingPenaltyDTO {
  vereinProgrammId: number;
  minutesOverrun: number;
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
  einsatzFreitag: Einsatzzeit[];
  einsatzSamstag: Einsatzzeit[];
  einsatzSonntag: Einsatzzeit[];
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

export interface SponsorDTO {
  name: string;
  cloudflareId?: string;
  url?: string;
}

export interface SponsoringDTO {
  hauptsponsor: SponsorDTO[];
  premium: SponsorDTO[];
  deluxe: SponsorDTO[];
  sponsor: SponsorDTO[];
  musikfan: SponsorDTO[];
  goenner: SponsorDTO[];
}

export interface TimetableDayOverviewDTO {
  day: string;
  entries: TimetableOverviewEntryDTO[];
}

export interface TimetableOverviewEntryDTO {
  vereinId: number;
  vereinIdentifier: string;
  vereinsname: string;
  modul: string;
  competition: string;
  type: TimetableEntryType;
  typeDescription: string;
  location: LocationDTO;
  date: DateAsString;
  start: DateAsString;
  end: DateAsString;
  time: string;
}

export interface TimetablePreviewDTO {
  header1: string;
  header2?: string;
  header3?: string;
  location: LocationDTO;
  date: DateAsString;
  startTime: DateAsString;
  endTime: DateAsString;
  minutesUntilStart: number;
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

export interface UnterhaltungTypeDTO {
  type: UnterhaltungEntryType;
  entries: UnterhaltungsEntryDTO[];
}

export interface UnterhaltungsEntryDTO {
  type: UnterhaltungEntryType;
  date: DateAsString;
  start: DateAsString;
  end?: DateAsString;
  title: string;
  subtitle?: string;
  text?: string;
  location: LocationDTO;
  cloudflareId?: string;
  vereinIdentifier?: string;
  unterhaltungIdentifier?: string;
}

export interface UpcomingVereinDTO {
  timetableEntryId: number;
  vereinIdentifier: string;
  vereinName: string;
  location: string;
  startTime: DateAsString;
  minutesUntilStart: number;
  id?: string;
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
  anmeldungDetail: VereinsanmeldungDetailDTO;
  phase1Done: boolean;
  phase2Done: boolean;
  phase4Done: boolean;
  phase2ConfirmedBy?: string;
  phase2ConfirmedAt?: DateAsString;
  phase4ConfirmedAt?: DateAsString;
  stageSetupConfirmedAt?: DateAsString;
  timetableEntries: TimetableOverviewEntryDTO[];
  messages: VereinMessageDTO[];
  errata: VereinErrataDTO[];
  lunchTime: DateAsString;
  instrumentenDepot?: LocationDTO;
  instrumentenDepotParademusik?: LocationDTO;
  programmUpdated: boolean;
  phase1Status: PhaseStatus;
  phase2Status: PhaseStatus;
  phase4Status: PhaseStatus;
}

export interface VereinMessageDTO {
  message: string;
  createdAt: DateAsString;
  createdBy: string;
  ownMessage: boolean;
}

export interface VereinPlayingDTO {
  timetableEntryId: number;
  vereinProgrammId: number;
  vereinsname: string;
  modul: Modul;
  startTime: DateAsString;
  endTime: DateAsString;
  minDurationInSeconds?: number;
  maxDurationInSeconds?: number;
  started: boolean;
  ended: boolean;
  jury: string;
  minutesOverrun?: number;
  bonus?: number;
}

export interface VereinPresentationDTO {
  id: number;
  name: string;
  direktionName?: string;
  logoImgId?: string;
  bildImgId?: string;
  homepage?: string;
  facebook?: string;
  instagram?: string;
  websiteText?: string;
  timetableEntries: VereinTimetableEntryDTO[];
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

export interface VereinStageSetupDTO {
  vereinId: number;
  locationIdentifier: string;
  stageSetup: string;
  dirigentenpodest: boolean;
  ablagenAmount?: number;
  comment?: string;
  hasAdditionalImage: boolean;
}

export interface VereinTeilnahmeDTO {
  id: number;
  identifier: string;
  name: string;
  logoImgId?: string;
  bildImgId?: string;
  homepage?: string;
  facebook?: string;
  instagram?: string;
  websiteText?: string;
}

export interface VereinTimetableEntryDTO {
  modul: Modul;
  competition: string;
  location: LocationDTO;
  dateTime: string;
  titel?: string;
  description?: string;
  programm: TitelDTO[];
}

export interface VereinsangabenDTO extends IsValid {
  vereinsname?: string;
  adresse?: string;
  plz?: number;
  ort?: string;
  homepage?: string;
  facebook?: string;
  instagram?: string;
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

export interface VereinsanmeldungDetailDTO extends IsValid {
  festfuehrerAmount?: number;
  festkartenMusikerAmount?: number;
  festkartenBegleiterAmount?: number;
  freitagabendAmount?: number;
  gehbehinderung: boolean;
  partiturenSent: boolean;
  partiturenSentAt?: DateAsString;
  gesamtchor: boolean;
  adhocOrchester: boolean;
  adhocOrchesterTeilnehmer: AdhocOrchesterTeilnehmerDTO[];
  nichtmitglieder: NichtmitgliederDTO[];
  anreisePublicTransport: boolean;
  anreisePublicTransportType?: string;
  anreiseOtherwise?: string;
  verpflegungMeat?: number;
  verpflegungVegan?: number;
  verpflegungAllergies?: number;
  verpflegungNone?: number;
  verpflegungHelper1?: string;
  verpflegungHelper2?: string;
  verpflegungHelper3?: string;
  verpflegungHelper4?: string;
  verpflegungHelper5?: string;
  verpflegungHelper6?: string;
  hasPartituren: boolean;
}

export interface VereinsinfoDTO extends IsValid {
  logoImgId?: number;
  bildImgId?: number;
  logoImgCloudflareId?: string;
  bildImgCloudflareId?: string;
  websiteText?: string;
}

export interface VerifyEmailRequestDTO {
  email: string;
  verification: string;
}

export interface AppPageCreateDTO {
  markdown: string;
  title: string;
  news: boolean;
  cloudflareId?: string;
}

export interface BroadcastCreateDTO {
  ids: number[];
  message: string;
}

export interface ErrataDTO {
  id: number;
  modul: Modul;
  klasse: Klasse;
  besetzung: Besetzung;
  description: string;
  text?: string;
}

export interface ErrataSendDTO {
  modul: Modul;
  klasse: Klasse;
  besetzung: Besetzung;
}

export interface JudgeDTO {
  id: number;
  name: string;
  email: string;
}

export interface JudgeReportCreateDTO {
  timetableEntryId: number;
  modul: Modul;
  judge1Id: number;
  judge2Id: number;
  judge3Id: number;
  judge4Id?: number;
}

export interface JuryLoginCreateDTO {
  name: string;
  firstName: string;
  email: string;
  password: string;
}

export interface LocationSelectionDTO {
  id: number;
  name: string;
}

export interface MessageFavoriteDTO {
  identifier: string;
  title: string;
  body: string;
}

export interface MessageSendDTO {
  type: MessageType;
  title: string;
  body: string;
  route: string;
}

export interface MessageSendTokenDTO {
  token: string;
  title: string;
  body: string;
  route: string;
}

export interface RankingSummaryDTO {
  vereinsName: string;
  competition: string;
  rankings: RankingDTO[];
}

export interface TimetableEntryCreateDTO {
  vereinProgrammId: number;
  modul: Modul;
  modulDescription: string;
  klasse?: string;
  besetzung?: string;
  entries: TimeTableEntryDTO[];
}

export interface TimeTableEntryDTO {
  type: TimetableEntryType;
  locationId: number;
  availableLocations: LocationSelectionDTO[];
  date: DateAsString;
  start: DateAsString;
  end: DateAsString;
}

export interface TimetableEntryDTO {
  id: number;
  modul: Modul;
  modulDescription: string;
  klasse?: string;
  besetzung?: string;
  locationId: number;
  location: string;
  verein: string;
  date: DateAsString;
  start: DateAsString;
  end: DateAsString;
  type: TimetableEntryType;
  judge1?: string;
  judge2?: string;
  judge3?: string;
  judge4?: string;
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

export interface VereinAssignmentDTO {
  id: number;
  name: string;
  programme: VereinAssignmentProgrammDTO[];
}

export interface VereinAssignmentProgrammDTO {
  id: number;
  modul: Modul;
  modulDescription: string;
  klasse?: string;
  besetzung?: string;
}

export interface VereinCommentCreateDTO {
  comment: string;
}

export interface VereinCommentDTO {
  comment: string;
  createdAt: DateAsString;
  createdBy: string;
}

export interface VereinErrataDTO {
  description: string;
  text: string;
}

export interface VereinMessageCreateDTO {
  message: string;
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
  phase2Confirmed: boolean;
  phase4Confirmed: boolean;
  phase1: PhaseStatus;
  phase2: PhaseStatus;
  phase4: PhaseStatus;
  hasComments: boolean;
  hasMessages: boolean;
  programmLastUpdated?: DateAsString;
}

export interface VereinProgrammSelectionDTO {
  id: number;
  modul: Modul;
  modulDescription: string;
  klasse?: string;
  besetzung?: string;
}

export interface IsValid {
  valid: boolean;
}

export type DateAsString = string;

export enum JudgeReportModulCategory {
  MODUL_G_KAT_A = "MODUL_G_KAT_A",
  MODUL_G_KAT_B = "MODUL_G_KAT_B",
  MODUL_G_KAT_C = "MODUL_G_KAT_C",
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

export enum JudgeRole {
  JUROR_1 = "JUROR_1",
  JUROR_2 = "JUROR_2",
  JUROR_3 = "JUROR_3",
  JUROR_1_OPTISCH = "JUROR_1_OPTISCH",
  JUROR_2_MUSIKALISCH = "JUROR_2_MUSIKALISCH",
  JUROR_3_MUSIKALISCH = "JUROR_3_MUSIKALISCH",
  JUROR_4_OPTISCH = "JUROR_4_OPTISCH",
}

export enum JudgeReportStatus {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum JudgeReportCategory {
  STIMMUNG_INTONATION = "STIMMUNG_INTONATION",
  TONKULTUR = "TONKULTUR",
  RHYTHMUS_METRUM = "RHYTHMUS_METRUM",
  DYNAMIK_KLANGAUSGLEICH = "DYNAMIK_KLANGAUSGLEICH",
  TECHNIK_ARTIKULATION = "TECHNIK_ARTIKULATION",
  TECHNIK_PHRASIERUNG_ARTIKULATION = "TECHNIK_PHRASIERUNG_ARTIKULATION",
  TONKULTUR_TECHNIK_ARTIKULATION = "TONKULTUR_TECHNIK_ARTIKULATION",
  MUSIKALISCHER_AUSDRUCK = "MUSIKALISCHER_AUSDRUCK",
  INTERPRETATION = "INTERPRETATION",
  INTERPRETATION_STILEMPFINDEN = "INTERPRETATION_STILEMPFINDEN",
  ORGANISATION_ENSEMBLEAUFSTELLUNG = "ORGANISATION_ENSEMBLEAUFSTELLUNG",
  PROGRAMMAUFBAU = "PROGRAMMAUFBAU",
  VIELSEITIGKEIT_STILEMPFINDEN = "VIELSEITIGKEIT_STILEMPFINDEN",
  SCHWIERIGKEITSGRAD = "SCHWIERIGKEITSGRAD",
  PROGRAMMWAHL = "PROGRAMMWAHL",
  GESAMTEINDRUCK = "GESAMTEINDRUCK",
  PRAESENTATION_MELDUNG = "PRAESENTATION_MELDUNG",
  PRAESENTATION_VERHALTEN = "PRAESENTATION_VERHALTEN",
  PRAESENTATION_AUSSTRAHLUNG = "PRAESENTATION_AUSSTRAHLUNG",
  PRAESENTATION_AUFSTELLUNG = "PRAESENTATION_AUFSTELLUNG",
  PRAESENTATION_INSTRUMENTENHALTUNG = "PRAESENTATION_INSTRUMENTENHALTUNG",
  PRAESENTATION_AUSRICHTUNG = "PRAESENTATION_AUSRICHTUNG",
  PRAESENTATION_ABSTAENDE = "PRAESENTATION_ABSTAENDE",
  ABMARSCH_KOMMANDI = "ABMARSCH_KOMMANDI",
  ABMARSCH_ABMARSCH = "ABMARSCH_ABMARSCH",
  ABMARSCH_TAMBOURBEGINN = "ABMARSCH_TAMBOURBEGINN",
  ABMARSCH_INSTRUMENTE_ANHEBEN = "ABMARSCH_INSTRUMENTE_ANHEBEN",
  ABMARSCH_SPIELWECHSEL_SPIEL = "ABMARSCH_SPIELWECHSEL_SPIEL",
  PARADE_TEMPO = "PARADE_TEMPO",
  PARADE_SCHRITTLAENGE = "PARADE_SCHRITTLAENGE",
  PARADE_GLEICHSCHRITT = "PARADE_GLEICHSCHRITT",
  PARADE_INSTRUMENTENHALTUNG = "PARADE_INSTRUMENTENHALTUNG",
  PARADE_AUSRICHTUNG = "PARADE_AUSRICHTUNG",
  PARADE_ABSTAENDE = "PARADE_ABSTAENDE",
  PARADE_GESAMTWIRKUNG = "PARADE_GESAMTWIRKUNG",
  MUSIKALISCH_GESAMTEINDRUCK1 = "MUSIKALISCH_GESAMTEINDRUCK1",
  MUSIK_STIMMUNG = "MUSIK_STIMMUNG",
  MUSIK_TONKULTUR = "MUSIK_TONKULTUR",
  MUSIK_RHYTHMUS = "MUSIK_RHYTHMUS",
  MUSIK_DYNAMIK = "MUSIK_DYNAMIK",
  MUSIK_TECHNIK = "MUSIK_TECHNIK",
  MUSIK_AUSDRUCK = "MUSIK_AUSDRUCK",
  MUSIK_INTERPRETATION = "MUSIK_INTERPRETATION",
  OPTISCH_GESAMTWIRKUNG = "OPTISCH_GESAMTWIRKUNG",
  SCHLUSSPHASE_KOMMANDI = "SCHLUSSPHASE_KOMMANDI",
  SCHLUSSPHASE_SPIELWECHSEL = "SCHLUSSPHASE_SPIELWECHSEL",
  SCHLUSSPHASE_INSTRUMENTE_SENKEN = "SCHLUSSPHASE_INSTRUMENTE_SENKEN",
  SCHLUSSPHASE_ARME_SCHWINGEN = "SCHLUSSPHASE_ARME_SCHWINGEN",
  SCHLUSSPHASE_ANHALTEN = "SCHLUSSPHASE_ANHALTEN",
  MUSIKALISCH_GESAMTEINDRUCK4 = "MUSIKALISCH_GESAMTEINDRUCK4",
  GRUNDLAGE_1 = "GRUNDLAGE_1",
  GRUNDLAGE_2 = "GRUNDLAGE_2",
  TECHNISCHE_AUSFUEHRUNG = "TECHNISCHE_AUSFUEHRUNG",
  RHYTHMIK = "RHYTHMIK",
  DYNAMIK = "DYNAMIK",
  ABZUG = "ABZUG",
  BEWERTUNG_TAMBOUREN = "BEWERTUNG_TAMBOUREN",
  BEWERTUNG_PERKUSSION_UND_KLEINPERKUSSION = "BEWERTUNG_PERKUSSION_UND_KLEINPERKUSSION",
  RHYTHMUS_UND_ZUSAMMENSPIEL = "RHYTHMUS_UND_ZUSAMMENSPIEL",
  DYNAMIK_UND_AUSGEWOGENHEIT = "DYNAMIK_UND_AUSGEWOGENHEIT",
  STIMMUNG_KLANG_UND_WAHL_INSTRUMENTE = "STIMMUNG_KLANG_UND_WAHL_INSTRUMENTE",
  MUSIKALISCHE_UMSETZUNG_VISUELLE_SCHLEGEL_EFFEKTE = "MUSIKALISCHE_UMSETZUNG_VISUELLE_SCHLEGEL_EFFEKTE",
  SCHWIERIGKEITSBONUS = "SCHWIERIGKEITSBONUS",
}

export enum JudgeReportCategoryRating {
  VERY_NEGATIVE = "VERY_NEGATIVE",
  NEGATIVE = "NEGATIVE",
  NEUTRAL = "NEUTRAL",
  POSITIVE = "POSITIVE",
  VERY_POSITIVE = "VERY_POSITIVE",
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

export enum LocationType {
  PARADEMUSIK = "PARADEMUSIK",
  EINSPIELLOKAL = "EINSPIELLOKAL",
  INSTRUMENTENDEPOT = "INSTRUMENTENDEPOT",
  WETTSPIELLOKAL = "WETTSPIELLOKAL",
  JURYFEEDBACK = "JURYFEEDBACK",
  PLATZKONZERT = "PLATZKONZERT",
  INFOSTAND = "INFOSTAND",
  FESTZELT = "FESTZELT",
}

export enum PercussionEquipmentType {
  STANDARD = "STANDARD",
  FULL = "FULL",
}

export enum UserRole {
  VEREIN = "VEREIN",
  ADMIN = "ADMIN",
  ADMIN_READ_ONLY = "ADMIN_READ_ONLY",
  JUDGE = "JUDGE",
  JUDGE_HELPER = "JUDGE_HELPER",
  IMPERSONATE = "IMPERSONATE",
}

export enum ModulDSelection {
  TITEL_1 = "TITEL_1",
  TITEL_2 = "TITEL_2",
}

export enum RankingStatus {
  PENDING = "PENDING",
  PROVISIONAL = "PROVISIONAL",
  FINAL = "FINAL",
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

export enum TimetableEntryType {
  EINSPIEL = "EINSPIEL",
  WETTSPIEL = "WETTSPIEL",
  BESPRECHUNG = "BESPRECHUNG",
  PLATZKONZERT = "PLATZKONZERT",
  MARSCHMUSIK = "MARSCHMUSIK",
}

export enum UnterhaltungEntryType {
  FREITAG_ABEND = "FREITAG_ABEND",
  SAMSTAG_TAG = "SAMSTAG_TAG",
  SAMSTAG_ABEND = "SAMSTAG_ABEND",
  SONNTAG = "SONNTAG",
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

export enum MessageType {
  EMERGENCY = "EMERGENCY",
  GENERAL = "GENERAL",
}
