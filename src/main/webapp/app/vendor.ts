/* after changing this file run 'yarn run webpack:build' */
/* tslint:disable */
import '../content/css/vendor.css';

// Imports all fontawesome core and solid icons

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faAddressBook,
    faAddressCard,
    faAdjust,
    faAlignCenter,
    faAlignJustify,
    faAlignLeft,
    faAlignRight,
    faAllergies,
    faAmbulance,
    faAmericanSignLanguageInterpreting,
    faAnchor,
    faAngleDoubleDown,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleDoubleUp,
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faArchive,
    faArrowAltCircleDown,
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faArrowAltCircleUp,
    faArrowCircleDown,
    faArrowCircleLeft,
    faArrowCircleRight,
    faArrowCircleUp,
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faArrowUp,
    faArrowsAlt,
    faArrowsAltH,
    faArrowsAltV,
    faAssistiveListeningSystems,
    faAsterisk,
    faAt,
    faAudioDescription,
    faBackward,
    faBalanceScale,
    faBan,
    faBandAid,
    faBarcode,
    faBars,
    faBaseballBall,
    faBasketballBall,
    faBath,
    faBatteryEmpty,
    faBatteryFull,
    faBatteryHalf,
    faBatteryQuarter,
    faBatteryThreeQuarters,
    faBed,
    faBeer,
    faBell,
    faBellSlash,
    faBicycle,
    faBinoculars,
    faBirthdayCake,
    faBlind,
    faBold,
    faBolt,
    faBomb,
    faBook,
    faBookmark,
    faBowlingBall,
    faBox,
    faBoxOpen,
    faBoxes,
    faBraille,
    faBriefcase,
    faBriefcaseMedical,
    faBug,
    faBuilding,
    faBullhorn,
    faBullseye,
    faBurn,
    faBus,
    faCalculator,
    faCalendar,
    faCalendarAlt,
    faCalendarCheck,
    faCalendarMinus,
    faCalendarPlus,
    faCalendarTimes,
    faCamera,
    faCameraRetro,
    faCapsules,
    faCar,
    faCaretDown,
    faCaretLeft,
    faCaretRight,
    faCaretSquareDown,
    faCaretSquareLeft,
    faCaretSquareRight,
    faCaretSquareUp,
    faCaretUp,
    faCartArrowDown,
    faCartPlus,
    faCertificate,
    faChartArea,
    faChartBar,
    faChartLine,
    faChartPie,
    faCheck,
    faCheckCircle,
    faCheckSquare,
    faChess,
    faChessBishop,
    faChessBoard,
    faChessKing,
    faChessKnight,
    faChessPawn,
    faChessQueen,
    faChessRook,
    faChevronCircleDown,
    faChevronCircleLeft,
    faChevronCircleRight,
    faChevronCircleUp,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faChevronUp,
    faChild,
    faCircle,
    faCircleNotch,
    faClipboard,
    faClipboardCheck,
    faClipboardList,
    faClock,
    faClone,
    faClosedCaptioning,
    faCloud,
    faCloudDownloadAlt,
    faCloudUploadAlt,
    faCode,
    faCodeBranch,
    faCoffee,
    faCog,
    faCogs,
    faColumns,
    faComment,
    faCommentAlt,
    faCommentDots,
    faCommentSlash,
    faComments,
    faCompass,
    faCompress,
    faCopy,
    faCopyright,
    faCouch,
    faCreditCard,
    faCrop,
    faCrosshairs,
    faCube,
    faCubes,
    faCut,
    faDatabase,
    faDeaf,
    faDesktop,
    faDiagnoses,
    faDna,
    faDollarSign,
    faDolly,
    faDollyFlatbed,
    faDonate,
    faDotCircle,
    faDove,
    faDownload,
    faEdit,
    faEject,
    faEllipsisH,
    faEllipsisV,
    faEnvelope,
    faEnvelopeOpen,
    faEnvelopeSquare,
    faEraser,
    faEuroSign,
    faExchangeAlt,
    faExclamation,
    faExclamationCircle,
    faExclamationTriangle,
    faExpand,
    faExpandArrowsAlt,
    faExternalLinkAlt,
    faExternalLinkSquareAlt,
    faEye,
    faEyeDropper,
    faEyeSlash,
    faFastBackward,
    faFastForward,
    faFax,
    faFemale,
    faFighterJet,
    faFile,
    faFileAlt,
    faFileArchive,
    faFileAudio,
    faFileCode,
    faFileExcel,
    faFileImage,
    faFileMedical,
    faFileMedicalAlt,
    faFilePdf,
    faFilePowerpoint,
    faFileVideo,
    faFileWord,
    faFilm,
    faFilter,
    faFire,
    faFireExtinguisher,
    faFirstAid,
    faFlag,
    faFlagCheckered,
    faFlask,
    faFolder,
    faFolderOpen,
    faFont,
    faFootballBall,
    faForward,
    faFrown,
    faFutbol,
    faGamepad,
    faGavel,
    faGem,
    faGenderless,
    faGift,
    faGlassMartini,
    faGlobe,
    faGolfBall,
    faGraduationCap,
    faHSquare,
    faHandHolding,
    faHandHoldingHeart,
    faHandHoldingUsd,
    faHandLizard,
    faHandPaper,
    faHandPeace,
    faHandPointDown,
    faHandPointLeft,
    faHandPointRight,
    faHandPointUp,
    faHandPointer,
    faHandRock,
    faHandScissors,
    faHandSpock,
    faHands,
    faHandsHelping,
    faHandshake,
    faHashtag,
    faHdd,
    faHeading,
    faHeadphones,
    faHeart,
    faHeartbeat,
    faHistory,
    faHockeyPuck,
    faHome,
    faHospital,
    faHospitalAlt,
    faHospitalSymbol,
    faHourglass,
    faHourglassEnd,
    faHourglassHalf,
    faHourglassStart,
    faICursor,
    faIdBadge,
    faIdCard,
    faIdCardAlt,
    faImage,
    faImages,
    faInbox,
    faIndent,
    faIndustry,
    faInfo,
    faInfoCircle,
    faItalic,
    faKey,
    faKeyboard,
    faLanguage,
    faLaptop,
    faLeaf,
    faLemon,
    faLevelDownAlt,
    faLevelUpAlt,
    faLifeRing,
    faLightbulb,
    faLink,
    faLiraSign,
    faList,
    faListAlt,
    faListOl,
    faListUl,
    faLocationArrow,
    faLock,
    faLockOpen,
    faLongArrowAltDown,
    faLongArrowAltLeft,
    faLongArrowAltRight,
    faLongArrowAltUp,
    faLowVision,
    faMagic,
    faMagnet,
    faMale,
    faMap,
    faMapMarker,
    faMapMarkerAlt,
    faMapPin,
    faMapSigns,
    faMars,
    faMarsDouble,
    faMarsStroke,
    faMarsStrokeH,
    faMarsStrokeV,
    faMedkit,
    faMeh,
    faMercury,
    faMicrochip,
    faMicrophone,
    faMicrophoneSlash,
    faMinus,
    faMinusCircle,
    faMinusSquare,
    faMobile,
    faMobileAlt,
    faMoneyBillAlt,
    faMoon,
    faMotorcycle,
    faMousePointer,
    faMusic,
    faNeuter,
    faNewspaper,
    faNotesMedical,
    faObjectGroup,
    faObjectUngroup,
    faOutdent,
    faPaintBrush,
    faPallet,
    faPaperPlane,
    faPaperclip,
    faParachuteBox,
    faParagraph,
    faPaste,
    faPause,
    faPauseCircle,
    faPaw,
    faPenSquare,
    faPencilAlt,
    faPeopleCarry,
    faPercent,
    faPhone,
    faPhoneSlash,
    faPhoneSquare,
    faPhoneVolume,
    faPiggyBank,
    faPills,
    faPlane,
    faPlay,
    faPlayCircle,
    faPlug,
    faPlus,
    faPlusCircle,
    faPlusSquare,
    faPodcast,
    faPoo,
    faPoundSign,
    faPowerOff,
    faPrescriptionBottle,
    faPrescriptionBottleAlt,
    faPrint,
    faProcedures,
    faPuzzlePiece,
    faQrcode,
    faQuestion,
    faQuestionCircle,
    faQuidditch,
    faQuoteLeft,
    faQuoteRight,
    faRandom,
    faRecycle,
    faRedo,
    faRedoAlt,
    faRegistered,
    faReply,
    faReplyAll,
    faRetweet,
    faRibbon,
    faRoad,
    faRocket,
    faRss,
    faRssSquare,
    faRubleSign,
    faRupeeSign,
    faSave,
    faSearch,
    faSearchMinus,
    faSearchPlus,
    faSeedling,
    faServer,
    faShare,
    faShareAlt,
    faShareAltSquare,
    faShareSquare,
    faShekelSign,
    faShieldAlt,
    faShip,
    faShippingFast,
    faShoppingBag,
    faShoppingBasket,
    faShoppingCart,
    faShower,
    faSign,
    faSignInAlt,
    faSignLanguage,
    faSignOutAlt,
    faSignal,
    faSitemap,
    faSlidersH,
    faSmile,
    faSmoking,
    faSnowflake,
    faSort,
    faSortAlphaDown,
    faSortAlphaUp,
    faSortAmountDown,
    faSortAmountUp,
    faSortDown,
    faSortNumericDown,
    faSortNumericUp,
    faSortUp,
    faSpaceShuttle,
    faSpinner,
    faSquare,
    faSquareFull,
    faStar,
    faStarHalf,
    faStepBackward,
    faStepForward,
    faStethoscope,
    faStickyNote,
    faStop,
    faStopCircle,
    faStopwatch,
    faStreetView,
    faStrikethrough,
    faSubscript,
    faSubway,
    faSuitcase,
    faSun,
    faSuperscript,
    faSync,
    faSyncAlt,
    faSyringe,
    faTable,
    faTableTennis,
    faTablet,
    faTabletAlt,
    faTablets,
    faTachometerAlt,
    faTag,
    faTags,
    faTape,
    faTasks,
    faTaxi,
    faTerminal,
    faTextHeight,
    faTextWidth,
    faTh,
    faThLarge,
    faThList,
    faThermometer,
    faThermometerEmpty,
    faThermometerFull,
    faThermometerHalf,
    faThermometerQuarter,
    faThermometerThreeQuarters,
    faThumbsDown,
    faThumbsUp,
    faThumbtack,
    faTicketAlt,
    faTimes,
    faTimesCircle,
    faTint,
    faToggleOff,
    faToggleOn,
    faTrademark,
    faTrain,
    faTransgender,
    faTransgenderAlt,
    faTrash,
    faTrashAlt,
    faTree,
    faTrophy,
    faTruck,
    faTruckLoading,
    faTruckMoving,
    faTty,
    faTv,
    faUmbrella,
    faUnderline,
    faUndo,
    faUndoAlt,
    faUniversalAccess,
    faUniversity,
    faUnlink,
    faUnlock,
    faUnlockAlt,
    faUpload,
    faUser,
    faUserCircle,
    faUserMd,
    faUserPlus,
    faUserSecret,
    faUserTimes,
    faUsers,
    faUtensilSpoon,
    faUtensils,
    faVenus,
    faVenusDouble,
    faVenusMars,
    faVial,
    faVials,
    faVideo,
    faVideoSlash,
    faVolleyballBall,
    faVolumeDown,
    faVolumeOff,
    faVolumeUp,
    faWarehouse,
    faWeight,
    faWheelchair,
    faWifi,
    faWindowClose,
    faWindowMaximize,
    faWindowMinimize,
    faWindowRestore,
    faWineGlass,
    faWonSign,
    faWrench,
    faXRay,
    faYenSign
} from '@fortawesome/free-solid-svg-icons';

// Adds the SVG icon to the library so you can use it in your page
library.add(faAddressBook);
library.add(faAddressCard);
library.add(faAdjust);
library.add(faAlignCenter);
library.add(faAlignJustify);
library.add(faAlignLeft);
library.add(faAlignRight);
library.add(faAllergies);
library.add(faAmbulance);
library.add(faAmericanSignLanguageInterpreting);
library.add(faAnchor);
library.add(faAngleDoubleDown);
library.add(faAngleDoubleLeft);
library.add(faAngleDoubleRight);
library.add(faAngleDoubleUp);
library.add(faAngleDown);
library.add(faAngleLeft);
library.add(faAngleRight);
library.add(faAngleUp);
library.add(faArchive);
library.add(faArrowAltCircleDown);
library.add(faArrowAltCircleLeft);
library.add(faArrowAltCircleRight);
library.add(faArrowAltCircleUp);
library.add(faArrowCircleDown);
library.add(faArrowCircleLeft);
library.add(faArrowCircleRight);
library.add(faArrowCircleUp);
library.add(faArrowDown);
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faArrowUp);
library.add(faArrowsAlt);
library.add(faArrowsAltH);
library.add(faArrowsAltV);
library.add(faAssistiveListeningSystems);
library.add(faAsterisk);
library.add(faAt);
library.add(faAudioDescription);
library.add(faBackward);
library.add(faBalanceScale);
library.add(faBan);
library.add(faBandAid);
library.add(faBarcode);
library.add(faBars);
library.add(faBaseballBall);
library.add(faBasketballBall);
library.add(faBath);
library.add(faBatteryEmpty);
library.add(faBatteryFull);
library.add(faBatteryHalf);
library.add(faBatteryQuarter);
library.add(faBatteryThreeQuarters);
library.add(faBed);
library.add(faBeer);
library.add(faBell);
library.add(faBellSlash);
library.add(faBicycle);
library.add(faBinoculars);
library.add(faBirthdayCake);
library.add(faBlind);
library.add(faBold);
library.add(faBolt);
library.add(faBomb);
library.add(faBook);
library.add(faBookmark);
library.add(faBowlingBall);
library.add(faBox);
library.add(faBoxOpen);
library.add(faBoxes);
library.add(faBraille);
library.add(faBriefcase);
library.add(faBriefcaseMedical);
library.add(faBug);
library.add(faBuilding);
library.add(faBullhorn);
library.add(faBullseye);
library.add(faBurn);
library.add(faBus);
library.add(faCalculator);
library.add(faCalendar);
library.add(faCalendarAlt);
library.add(faCalendarCheck);
library.add(faCalendarMinus);
library.add(faCalendarPlus);
library.add(faCalendarTimes);
library.add(faCamera);
library.add(faCameraRetro);
library.add(faCapsules);
library.add(faCar);
library.add(faCaretDown);
library.add(faCaretLeft);
library.add(faCaretRight);
library.add(faCaretSquareDown);
library.add(faCaretSquareLeft);
library.add(faCaretSquareRight);
library.add(faCaretSquareUp);
library.add(faCaretUp);
library.add(faCartArrowDown);
library.add(faCartPlus);
library.add(faCertificate);
library.add(faChartArea);
library.add(faChartBar);
library.add(faChartLine);
library.add(faChartPie);
library.add(faCheck);
library.add(faCheckCircle);
library.add(faCheckSquare);
library.add(faChess);
library.add(faChessBishop);
library.add(faChessBoard);
library.add(faChessKing);
library.add(faChessKnight);
library.add(faChessPawn);
library.add(faChessQueen);
library.add(faChessRook);
library.add(faChevronCircleDown);
library.add(faChevronCircleLeft);
library.add(faChevronCircleRight);
library.add(faChevronCircleUp);
library.add(faChevronDown);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faChevronUp);
library.add(faChild);
library.add(faCircle);
library.add(faCircleNotch);
library.add(faClipboard);
library.add(faClipboardCheck);
library.add(faClipboardList);
library.add(faClock);
library.add(faClone);
library.add(faClosedCaptioning);
library.add(faCloud);
library.add(faCloudDownloadAlt);
library.add(faCloudUploadAlt);
library.add(faCode);
library.add(faCodeBranch);
library.add(faCoffee);
library.add(faCog);
library.add(faCogs);
library.add(faColumns);
library.add(faComment);
library.add(faCommentAlt);
library.add(faCommentDots);
library.add(faCommentSlash);
library.add(faComments);
library.add(faCompass);
library.add(faCompress);
library.add(faCopy);
library.add(faCopyright);
library.add(faCouch);
library.add(faCreditCard);
library.add(faCrop);
library.add(faCrosshairs);
library.add(faCube);
library.add(faCubes);
library.add(faCut);
library.add(faDatabase);
library.add(faDeaf);
library.add(faDesktop);
library.add(faDiagnoses);
library.add(faDna);
library.add(faDollarSign);
library.add(faDolly);
library.add(faDollyFlatbed);
library.add(faDonate);
library.add(faDotCircle);
library.add(faDove);
library.add(faDownload);
library.add(faEdit);
library.add(faEject);
library.add(faEllipsisH);
library.add(faEllipsisV);
library.add(faEnvelope);
library.add(faEnvelopeOpen);
library.add(faEnvelopeSquare);
library.add(faEraser);
library.add(faEuroSign);
library.add(faExchangeAlt);
library.add(faExclamation);
library.add(faExclamationCircle);
library.add(faExclamationTriangle);
library.add(faExpand);
library.add(faExpandArrowsAlt);
library.add(faExternalLinkAlt);
library.add(faExternalLinkSquareAlt);
library.add(faEye);
library.add(faEyeDropper);
library.add(faEyeSlash);
library.add(faFastBackward);
library.add(faFastForward);
library.add(faFax);
library.add(faFemale);
library.add(faFighterJet);
library.add(faFile);
library.add(faFileAlt);
library.add(faFileArchive);
library.add(faFileAudio);
library.add(faFileCode);
library.add(faFileExcel);
library.add(faFileImage);
library.add(faFileMedical);
library.add(faFileMedicalAlt);
library.add(faFilePdf);
library.add(faFilePowerpoint);
library.add(faFileVideo);
library.add(faFileWord);
library.add(faFilm);
library.add(faFilter);
library.add(faFire);
library.add(faFireExtinguisher);
library.add(faFirstAid);
library.add(faFlag);
library.add(faFlagCheckered);
library.add(faFlask);
library.add(faFolder);
library.add(faFolderOpen);
library.add(faFont);
library.add(faFootballBall);
library.add(faForward);
library.add(faFrown);
library.add(faFutbol);
library.add(faGamepad);
library.add(faGavel);
library.add(faGem);
library.add(faGenderless);
library.add(faGift);
library.add(faGlassMartini);
library.add(faGlobe);
library.add(faGolfBall);
library.add(faGraduationCap);
library.add(faHSquare);
library.add(faHandHolding);
library.add(faHandHoldingHeart);
library.add(faHandHoldingUsd);
library.add(faHandLizard);
library.add(faHandPaper);
library.add(faHandPeace);
library.add(faHandPointDown);
library.add(faHandPointLeft);
library.add(faHandPointRight);
library.add(faHandPointUp);
library.add(faHandPointer);
library.add(faHandRock);
library.add(faHandScissors);
library.add(faHandSpock);
library.add(faHands);
library.add(faHandsHelping);
library.add(faHandshake);
library.add(faHashtag);
library.add(faHdd);
library.add(faHeading);
library.add(faHeadphones);
library.add(faHeart);
library.add(faHeartbeat);
library.add(faHistory);
library.add(faHockeyPuck);
library.add(faHome);
library.add(faHospital);
library.add(faHospitalAlt);
library.add(faHospitalSymbol);
library.add(faHourglass);
library.add(faHourglassEnd);
library.add(faHourglassHalf);
library.add(faHourglassStart);
library.add(faICursor);
library.add(faIdBadge);
library.add(faIdCard);
library.add(faIdCardAlt);
library.add(faImage);
library.add(faImages);
library.add(faInbox);
library.add(faIndent);
library.add(faIndustry);
library.add(faInfo);
library.add(faInfoCircle);
library.add(faItalic);
library.add(faKey);
library.add(faKeyboard);
library.add(faLanguage);
library.add(faLaptop);
library.add(faLeaf);
library.add(faLemon);
library.add(faLevelDownAlt);
library.add(faLevelUpAlt);
library.add(faLifeRing);
library.add(faLightbulb);
library.add(faLink);
library.add(faLiraSign);
library.add(faList);
library.add(faListAlt);
library.add(faListOl);
library.add(faListUl);
library.add(faLocationArrow);
library.add(faLock);
library.add(faLockOpen);
library.add(faLongArrowAltDown);
library.add(faLongArrowAltLeft);
library.add(faLongArrowAltRight);
library.add(faLongArrowAltUp);
library.add(faLowVision);
library.add(faMagic);
library.add(faMagnet);
library.add(faMale);
library.add(faMap);
library.add(faMapMarker);
library.add(faMapMarkerAlt);
library.add(faMapPin);
library.add(faMapSigns);
library.add(faMars);
library.add(faMarsDouble);
library.add(faMarsStroke);
library.add(faMarsStrokeH);
library.add(faMarsStrokeV);
library.add(faMedkit);
library.add(faMeh);
library.add(faMercury);
library.add(faMicrochip);
library.add(faMicrophone);
library.add(faMicrophoneSlash);
library.add(faMinus);
library.add(faMinusCircle);
library.add(faMinusSquare);
library.add(faMobile);
library.add(faMobileAlt);
library.add(faMoneyBillAlt);
library.add(faMoon);
library.add(faMotorcycle);
library.add(faMousePointer);
library.add(faMusic);
library.add(faNeuter);
library.add(faNewspaper);
library.add(faNotesMedical);
library.add(faObjectGroup);
library.add(faObjectUngroup);
library.add(faOutdent);
library.add(faPaintBrush);
library.add(faPallet);
library.add(faPaperPlane);
library.add(faPaperclip);
library.add(faParachuteBox);
library.add(faParagraph);
library.add(faPaste);
library.add(faPause);
library.add(faPauseCircle);
library.add(faPaw);
library.add(faPenSquare);
library.add(faPencilAlt);
library.add(faPeopleCarry);
library.add(faPercent);
library.add(faPhone);
library.add(faPhoneSlash);
library.add(faPhoneSquare);
library.add(faPhoneVolume);
library.add(faPiggyBank);
library.add(faPills);
library.add(faPlane);
library.add(faPlay);
library.add(faPlayCircle);
library.add(faPlug);
library.add(faPlus);
library.add(faPlusCircle);
library.add(faPlusSquare);
library.add(faPodcast);
library.add(faPoo);
library.add(faPoundSign);
library.add(faPowerOff);
library.add(faPrescriptionBottle);
library.add(faPrescriptionBottleAlt);
library.add(faPrint);
library.add(faProcedures);
library.add(faPuzzlePiece);
library.add(faQrcode);
library.add(faQuestion);
library.add(faQuestionCircle);
library.add(faQuidditch);
library.add(faQuoteLeft);
library.add(faQuoteRight);
library.add(faRandom);
library.add(faRecycle);
library.add(faRedo);
library.add(faRedoAlt);
library.add(faRegistered);
library.add(faReply);
library.add(faReplyAll);
library.add(faRetweet);
library.add(faRibbon);
library.add(faRoad);
library.add(faRocket);
library.add(faRss);
library.add(faRssSquare);
library.add(faRubleSign);
library.add(faRupeeSign);
library.add(faSave);
library.add(faSearch);
library.add(faSearchMinus);
library.add(faSearchPlus);
library.add(faSeedling);
library.add(faServer);
library.add(faShare);
library.add(faShareAlt);
library.add(faShareAltSquare);
library.add(faShareSquare);
library.add(faShekelSign);
library.add(faShieldAlt);
library.add(faShip);
library.add(faShippingFast);
library.add(faShoppingBag);
library.add(faShoppingBasket);
library.add(faShoppingCart);
library.add(faShower);
library.add(faSign);
library.add(faSignInAlt);
library.add(faSignLanguage);
library.add(faSignOutAlt);
library.add(faSignal);
library.add(faSitemap);
library.add(faSlidersH);
library.add(faSmile);
library.add(faSmoking);
library.add(faSnowflake);
library.add(faSort);
library.add(faSortAlphaDown);
library.add(faSortAlphaUp);
library.add(faSortAmountDown);
library.add(faSortAmountUp);
library.add(faSortDown);
library.add(faSortNumericDown);
library.add(faSortNumericUp);
library.add(faSortUp);
library.add(faSpaceShuttle);
library.add(faSpinner);
library.add(faSquare);
library.add(faSquareFull);
library.add(faStar);
library.add(faStarHalf);
library.add(faStepBackward);
library.add(faStepForward);
library.add(faStethoscope);
library.add(faStickyNote);
library.add(faStop);
library.add(faStopCircle);
library.add(faStopwatch);
library.add(faStreetView);
library.add(faStrikethrough);
library.add(faSubscript);
library.add(faSubway);
library.add(faSuitcase);
library.add(faSun);
library.add(faSuperscript);
library.add(faSync);
library.add(faSyncAlt);
library.add(faSyringe);
library.add(faTable);
library.add(faTableTennis);
library.add(faTablet);
library.add(faTabletAlt);
library.add(faTablets);
library.add(faTachometerAlt);
library.add(faTag);
library.add(faTags);
library.add(faTape);
library.add(faTasks);
library.add(faTaxi);
library.add(faTerminal);
library.add(faTextHeight);
library.add(faTextWidth);
library.add(faTh);
library.add(faThLarge);
library.add(faThList);
library.add(faThermometer);
library.add(faThermometerEmpty);
library.add(faThermometerFull);
library.add(faThermometerHalf);
library.add(faThermometerQuarter);
library.add(faThermometerThreeQuarters);
library.add(faThumbsDown);
library.add(faThumbsUp);
library.add(faThumbtack);
library.add(faTicketAlt);
library.add(faTimes);
library.add(faTimesCircle);
library.add(faTint);
library.add(faToggleOff);
library.add(faToggleOn);
library.add(faTrademark);
library.add(faTrain);
library.add(faTransgender);
library.add(faTransgenderAlt);
library.add(faTrash);
library.add(faTrashAlt);
library.add(faTree);
library.add(faTrophy);
library.add(faTruck);
library.add(faTruckLoading);
library.add(faTruckMoving);
library.add(faTty);
library.add(faTv);
library.add(faUmbrella);
library.add(faUnderline);
library.add(faUndo);
library.add(faUndoAlt);
library.add(faUniversalAccess);
library.add(faUniversity);
library.add(faUnlink);
library.add(faUnlock);
library.add(faUnlockAlt);
library.add(faUpload);
library.add(faUser);
library.add(faUserCircle);
library.add(faUserMd);
library.add(faUserPlus);
library.add(faUserSecret);
library.add(faUserTimes);
library.add(faUsers);
library.add(faUtensilSpoon);
library.add(faUtensils);
library.add(faVenus);
library.add(faVenusDouble);
library.add(faVenusMars);
library.add(faVial);
library.add(faVials);
library.add(faVideo);
library.add(faVideoSlash);
library.add(faVolleyballBall);
library.add(faVolumeDown);
library.add(faVolumeOff);
library.add(faVolumeUp);
library.add(faWarehouse);
library.add(faWeight);
library.add(faWheelchair);
library.add(faWifi);
library.add(faWindowClose);
library.add(faWindowMaximize);
library.add(faWindowMinimize);
library.add(faWindowRestore);
library.add(faWineGlass);
library.add(faWonSign);
library.add(faWrench);
library.add(faXRay);
library.add(faYenSign);
// jhipster-needle-add-element-to-vendor - JHipster will add new menu items here
