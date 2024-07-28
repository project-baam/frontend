import { MarkedDates } from "react-native-calendars/src/types";

const isEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

const today = new Date().toISOString().split("T")[0];
const pastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [pastDate, today].concat(futureDates);

function getFutureDates(numberOfDays: number) {
  const array: string[] = [];
  for (let index = 1; index <= numberOfDays; index++) {
    let d = Date.now();
    if (index > 8) {
      const newMonth = new Date(d).getMonth() + 1;
      d = new Date(d).setMonth(newMonth);
    }
    const date = new Date(d + 864e5 * index);
    const dateString = date.toISOString().split("T")[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(numberOfDays: number) {
  return new Date(Date.now() - 864e5 * numberOfDays).toISOString().split("T")[0];
}

function getDayOfWeek(dateString: string) {
  const daysOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
}

export const agendaItems = [
  {
    title: dates[0],
    data: [
      {
        key: "school_event",
        hour: "09:00",
        duration: "1h",
        title: "1학기 중간고사",
        date: dates[0],
        dayOfWeek: getDayOfWeek(dates[0]),
        color: "#20DC33"
      }
    ]
  },
  {
    title: dates[1],
    data: [
      {
        key: "class_schedule",
        hour: "14:00",
        duration: "1h",
        title: "수학 수업",
        date: dates[1],
        dayOfWeek: getDayOfWeek(dates[1]),
        color: "#327CEA"
      },
      {
        key: "personal_event",
        hour: "16:00",
        duration: "1h",
        title: "과학 실험",
        date: dates[1],
        dayOfWeek: getDayOfWeek(dates[1]),
        color: "#E826F9"
      }
    ]
  },
  {
    title: dates[2],
    data: [
      {
        key: "class_schedule",
        hour: "10:00",
        duration: "1h",
        title: "영어 회화",
        date: dates[2],
        dayOfWeek: getDayOfWeek(dates[2]),
        color: "#327CEA"
      },
      {
        key: "school_event",
        hour: "13:00",
        duration: "하루종일",
        title: "체육 대회",
        date: dates[2],
        dayOfWeek: getDayOfWeek(dates[2]),
        color: "#20DC33"
      },
      {
        key: "personal_event",
        hour: "15:00",
        duration: "1h",
        title: "역사 토론",
        date: dates[2],
        dayOfWeek: getDayOfWeek(dates[2]),
        color: "#E826F9"
      }
    ]
  },
  {
    title: dates[3],
    data: [
      {
        key: "school_event",
        hour: "09:00",
        duration: "1h",
        title: "국어 시험",
        date: dates[3],
        dayOfWeek: getDayOfWeek(dates[3]),
        color: "#20DC33"
      }
    ]
  },
  {
    title: dates[4],
    data: [
      {
        key: "class_schedule",
        hour: "10:00",
        duration: "1h",
        title: "음악 수업",
        date: dates[4],
        dayOfWeek: getDayOfWeek(dates[4]),
        color: "#327CEA"
      }
    ]
  },
  {
    title: dates[5],
    data: [
      {
        key: "personal_event",
        hour: "09:00",
        duration: "1h",
        title: "음악 수업",
        date: dates[5],
        dayOfWeek: getDayOfWeek(dates[5]),
        color: "#E826F9"
      },
      {
        key: "school_event",
        hour: "10:00",
        duration: "1h",
        title: "미술 시간",
        date: dates[5],
        dayOfWeek: getDayOfWeek(dates[5]),
        color: "#20DC33"
      },
      {
        key: "class_schedule",
        hour: "11:00",
        duration: "1h",
        title: "도서관 방문",
        date: dates[5],
        dayOfWeek: getDayOfWeek(dates[5]),
        color: "#327CEA"
      },
      {
        key: "personal_event",
        hour: "13:00",
        duration: "1h",
        title: "창작 글쓰기",
        date: dates[5],
        dayOfWeek: getDayOfWeek(dates[5]),
        color: "#E826F9"
      }
    ]
  },
  {
    title: dates[6],
    data: [
      {
        key: "school_event",
        hour: "09:00",
        duration: "1h",
        title: "체육 수업",
        date: dates[6],
        dayOfWeek: getDayOfWeek(dates[6]),
        color: "#20DC33"
      }
    ]
  },
  {
    title: dates[7],
    data: [
      {
        key: "class_schedule",
        hour: "09:00",
        duration: "1h",
        title: "필라테스",
        date: dates[7],
        dayOfWeek: getDayOfWeek(dates[7]),
        color: "#327CEA"
      }
    ]
  },
  {
    title: dates[8],
    data: [
      {
        key: "personal_event",
        hour: "09:00",
        duration: "1h",
        title: "필라테스",
        date: dates[8],
        dayOfWeek: getDayOfWeek(dates[8]),
        color: "#E826F9"
      },
      {
        key: "school_event",
        hour: "10:00",
        duration: "1h",
        title: "요가",
        date: dates[8],
        dayOfWeek: getDayOfWeek(dates[8]),
        color: "#20DC33"
      },
      {
        key: "class_schedule",
        hour: "11:00",
        duration: "1h",
        title: "TRX 운동",
        date: dates[8],
        dayOfWeek: getDayOfWeek(dates[8]),
        color: "#327CEA"
      },
      {
        key: "personal_event",
        hour: "13:00",
        duration: "1h",
        title: "달리기 모임",
        date: dates[8],
        dayOfWeek: getDayOfWeek(dates[8]),
        color: "#E826F9"
      }
    ]
  },
  {
    title: dates[9],
    data: [
      {
        key: "school_event",
        hour: "13:00",
        duration: "1h",
        title: "수학 시험",
        date: dates[9],
        dayOfWeek: getDayOfWeek(dates[9]),
        color: "#20DC33"
      },
      {
        key: "class_schedule",
        hour: "15:00",
        duration: "1h",
        title: "체육 시간",
        date: dates[9],
        dayOfWeek: getDayOfWeek(dates[9]),
        color: "#327CEA"
      },
      {
        key: "personal_event",
        hour: "17:00",
        duration: "1h",
        title: "독서 모임",
        date: dates[9],
        dayOfWeek: getDayOfWeek(dates[9]),
        color: "#E826F9"
      }
    ]
  },
  {
    title: dates[10],
    data: [
      {
        key: "school_event",
        hour: "09:00",
        duration: "1h",
        title: "마지막 수업",
        date: dates[10],
        dayOfWeek: getDayOfWeek(dates[10]),
        color: "#20DC33"
      }
    ]
  },
  {
    title: dates[11],
    data: [
      {
        key: "class_schedule",
        hour: "10:00",
        duration: "1h",
        title: "한국사",
        date: dates[11],
        dayOfWeek: getDayOfWeek(dates[11]),
        color: "#327CEA"
      },
      {
        key: "personal_event",
        hour: "14:00",
        duration: "1h",
        title: "미적분학",
        date: dates[11],
        dayOfWeek: getDayOfWeek(dates[11]),
        color: "#E826F9"
      },
      {
        key: "school_event",
        hour: "16:00",
        duration: "1h",
        title: "생물학 실험",
        date: dates[11],
        dayOfWeek: getDayOfWeek(dates[11]),
        color: "#20DC33"
      }
    ]
  },
  {
    title: dates[12],
    data: [
      {
        key: "school_event",
        hour: "09:00",
        duration: "1h",
        title: "한국어 문법",
        date: dates[12],
        dayOfWeek: getDayOfWeek(dates[12]),
        color: "#20DC33"
      }
    ]
  },
  {
    title: dates[13],
    data: [
      {
        key: "class_schedule",
        hour: "09:00",
        duration: "1h",
        title: "프로그래밍 수업",
        date: dates[13],
        dayOfWeek: getDayOfWeek(dates[13]),
        color: "#327CEA"
      }
    ]
  }
];

export function getMarkedDates() {
  const marked: MarkedDates = {};

  agendaItems.forEach((item) => {
    const dots = item.data.map((event) => {
      return { key: event.key, color: getDotColor(event.key) };
    });

    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = {
        marked: true,
        dots: dots.slice(0, 3)
      };
    } else {
      marked[item.title] = { disabled: true };
    }
  });

  return marked;
}

function getDotColor(key: string) {
  switch (key) {
    case "school_event":
      return "#20DC33";
    case "class_schedule":
      return "#327CEA";
    case "personal_event":
      return "#E826F9";
    default:
      return "grey";
  }
}
