import moment from 'moment'

export const toISOString = ({date, startOf, endOf}) => {
  try {
    if (date.isValid()) {
      if (startOf) {
        return date.startOf(startOf).toISOString();
      } else if (endOf) {
        return date.endOf(endOf).toISOString();
      } else {
        return date.toISOString();
      }
    }
  }
  catch(err) {
    console.log("Error toISOString: ", err);
  }
}

export const toReadableString = ({date, format}) => {
  try {
    date = moment(date);
    if (!format) {
      format = 'YYYY-MM-DD , HH:mm'
    }
    return date.format(format);
  }
  catch(err) {
    console.log("Error toReadableString: ", err);
  }
}
