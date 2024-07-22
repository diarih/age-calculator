import CountDisplay from "./components/CountDisplay.jsx";
import React, {useMemo} from "react";
import Form from "./components/Form.jsx";

function App() {

  const [dateValue, setDateValue] = React.useState({
    day: 0,
    month: 0,
    year: 0
  });

  const onSubmitForm = (e) => {
    setDateValue(e)
  }

  const data = useMemo(() => {
    const currentDate = new Date();
    const birthDate = new Date(dateValue.year, dateValue.month - 1, dateValue.day);

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();

    let years = currentYear - birthYear;
    let months = currentMonth - birthMonth;
    let days = currentDay - birthDay;

    // Checking birth month greater than current month or birthday is greater than current day must equal birth current month
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      // previous year because it didn't pass the birth month or day
      years -= 1;
      months += 12; // compensate
    }

    // Checking if the date is lower than current
    if (days < 0) {
      // Get the previous month days
      const previousMonth = new Date(currentYear, currentMonth, 0).getDate();
      days += previousMonth;
      months -= 1;
    }

    years = dateValue.year ? years : 0;
    months = dateValue.month ? months : 0;
    days = dateValue.day ? days : 0;

    return {
      day: dateValue.day ? days : '--',
      month: dateValue.month ? months : '--',
      year: years || '--',
    };
  }, [dateValue])

  return (
    <div className={'w-full h-screen bg-neutral-100 flex justify-center items-center p-4'}>
      <div className={'bg-white rounded-3xl p-8 lg:p-12 inline-block space-y-5 lg:rounded-br-[172px] rounded-br-[64px]'}>
        <Form onSubmitForm={onSubmitForm}/>
        <div className={'-space-y-1 select-none'}>
          <CountDisplay label={'years'} number={data.year}/>
          <CountDisplay label={'months'} number={data.month}/>
          <CountDisplay label={'days'} number={data.day}/>
        </div>
      </div>
    </div>
  )
}

export default App
