import './App.css';
import React from 'react'
import {useState} from "react";



function TrainingNotes() {
    const [record, setRecord] = useState({date: '', km: 0}); //заполнение самой записи
    const [recordsList, setNewRecord] = useState([])

    return (
        <div className="data-collection">
            <form onSubmit={(evt) => {
                evt.preventDefault();

                const [dateFromForm, kmFromForm] = [record.date, record.km]
                const myRecord = {date: dateFromForm, km: parseFloat(kmFromForm)}

                const recordIndex = recordsList.findIndex(record => record.date === myRecord.date)
                if (recordIndex !== -1) {
                    const updatedArray = [...recordsList]
                    updatedArray[recordIndex].km += myRecord.km;
                    setNewRecord(updatedArray);
                } else {
                    setNewRecord([...recordsList, myRecord])
                }
            }}>
                <label>
                    Дата
                    <input type="date" className="data-of-training" onChange={(evt) => (setRecord({...record, date: evt.target.value}))}/>
                </label>
                <label>
                    Количество пройденных км
                    <input type="number" className="km-gone" onChange={(evt) => (setRecord({...record, km: evt.target.value}))}/>
                </label>
                <button className="btn btn-dark" type="submit">Ок</button>
            </form>
            <table className="table table-striped table-sm">
                <thead className="thead-dark">
                <tr>
                <th>Дата</th>
                <th>Кол-во пройденных км</th>
                </tr>
                </thead>
                <tbody>
                {recordsList.map((record) => (
                    <tr key={record.date+record.km}>
                        <td>{record.date}</td>
                        <td>{record.km}</td>
                        <td><button className="btn btn-dark">Редактировать</button></td>
                        <td onClick={(e) => {
                            console.log('delete работает');
                            const deletedRecordsNewArray = [...recordsList];
                            const indexToDelete = deletedRecordsNewArray.findIndex((recordNew) => recordNew.date === record.date);
                            const newOne = deletedRecordsNewArray.filter(record => record.date !== deletedRecordsNewArray[indexToDelete].date);
                            setNewRecord(newOne);
                        }
                        }><button className="btn btn-dark">Удалить</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}



function App() {
  return (
      <div className="wrapped-part">
          <h1>Учёт Ваших тренировок</h1>
          <TrainingNotes/>
      </div>
  )
}

export default App;