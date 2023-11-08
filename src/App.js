import './App.css';
import React from 'react'
import {useState} from "react";


function ColorConverter() {
    const [hexColor, setHexColor] = useState('');
    const [rgbColor, setRgbColor] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('');

    return (
        <div className="main-coverter-wraper" style={{backgroundColor: backgroundColor, height: '100vh'}}>
            <h1>Из HEX в RGB</h1>
            <form>
                <input type={hexColor} placeholder="Цвет в формате hex" onChange={(evt) => {
                    const myHexString = evt.target.value;
                    setHexColor(myHexString)
                    console.log(myHexString);

                    if (myHexString.indexOf('абвгдеёжзийкламнопрстуфхцчшщэюяьъ') === null) {
                        console.log('ОШИБКА')
                    }
                    if (myHexString.length < 3 ) {
                         const r = myHexString.slice(1, 3)
                    } else if (myHexString.length > 3 && myHexString.length < 6) {
                         const r = myHexString.slice(1, 3)
                         const g = myHexString.slice(3, 5)
                    } else if (myHexString.length >= 6) {
                        const r = myHexString.slice(1, 3)
                        const g = myHexString.slice(3, 5)
                        const b = myHexString.slice(5, 7)
                        console.log('r', r)
                        console.log('g', g)
                        console.log('b', b)
                        console.log('Произвошу парсинг числа')
                        const hexR = parseInt(r, 16);
                        const hexG = parseInt(g, 16);
                        const hexB = parseInt(b, 16);
                        console.log('parsed_r', hexR)
                        console.log('parsed_g', hexG)
                        console.log('parsed_b', hexB)

                        const dataString = `rgb(${hexR}, ${hexG}, ${hexB})`
                        console.log('Полученный RGB: ', dataString);
                        setRgbColor(dataString)
                        setBackgroundColor(dataString);

                    }
}}/>
                <input value={rgbColor} onChange={(e) => {console.log('перевод в обратку')}
                }/>
            </form>
        </div>
    );
}

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
                    <input type="date" className="data-of-training" value={record.date}onChange={(evt) => (setRecord({...record, date: evt.target.value}))}/>
                </label>
                <label>
                    Количество пройденных км
                    <input type="number" className="km-gone" value={record.value} onChange={(evt) => (setRecord({...record, km: evt.target.value}))}/>
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
          <ColorConverter/>
      </div>
  )
}

export default App;