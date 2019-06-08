import { LanguageType } from 'store/reducers/locale/langugeType'

export const environment = {
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'gamechaser01.firebaseapp.com',
    databaseURL: 'https://gamechaser01.firebaseio.com',
    projectId: 'gamechaser01',
    storageBucket: 'gamechaser01.appspot.com',
    messagingSenderId: '261037674821'
  },
  settings: {
    enabledOAuthLogin: true,
    appName: 'Game Chaser',
    defaultProfileCover: '',
    defaultLanguage: LanguageType.English
  },
  theme: {
    primaryColor: '#00b1b3',
    secondaryColor: '#4d545d'
  }
}
