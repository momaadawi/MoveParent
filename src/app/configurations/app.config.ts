export let Configuration = {
  api:{
    Account: {
      login: 'api/accounts/login/',
      changePassword: 'api/accounts/changepassword',
      logout: 'api/accounts/logout/'
    },
    Plans: {
      Get: 'api/plans/get'
    },
    Parents: {
      students: 'api/parents/students/'
    },
    absence: 'api/absenceplan',
    absenceReason: 'api/absenceplan/GetAbsenceReasons',
    absenceStudentForInProgressTrip: 'api/absenceplan/setStudentAbsentInProgressTrip',
    student: {
      getStudentById: 'api/students/get',
      updateStudentPOI: 'api/students/updatepoi',
      getstudenthistory: 'api/students/getstudenthistory'
    },
    Notification: {
      GetHistoryNotification: 'api/notifications/GetHistoryNotification'
    }
  },
  cookies: {
    Authorization: 'Authorization',
    Id: 'id',
    Image: 'image',
    UserName: 'userName',
    Direction: 'dir',
    DeviceToken: 'DeviceToken',
    Culture: 'culture',
    FullName: 'FullName'
  },
  googleApiKey: 'AIzaSyA8Y53lojH7RkCC3vH_nGmmEv0XUpZI10M',
  alertTime: 4000,
  alertPosition: {
    top: ''
  },
  assets: {
    welcome_building_img: 'assets/intro/welcome-bulding.svg',
    welcome_girl_sitting: 'assets/intro/welcome-girl-sit.svg',
    welcome_bus: 'assets/intro/welcome-bus.svg'
  }
};

