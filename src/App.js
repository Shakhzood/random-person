import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelopeOpen,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
import "./App.css";
import Button from "./Button";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    console.log(person);
    const { phone, email } = person;
    const { large: image } = person.picture;
    const {
      login: { password },
    } = person;
    const { first, last } = person.name;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;
    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };
    setPerson(newPerson);
    setLoading(false);
    setTitle("name");
    setValue(newPerson.name);
  };

  useEffect(() => {
    getPerson();
  }, []);

  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
      // console.log(newValue);
    }
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="default"
            className="user-img"
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <Button
              text={<FaUser />}
              className="icon"
              dataLabel="name"
              onMouseOver={handleValue}
            />
            <Button
              text={<FaEnvelopeOpen />}
              className="icon"
              dataLabel="email"
              onMouseOver={handleValue}
            />
            <Button
              text={<FaCalendarTimes />}
              className="icon"
              dataLabel="age"
              onMouseOver={handleValue}
            />
            <Button
              text={<FaMap />}
              className="icon"
              dataLabel="street"
              onMouseOver={handleValue}
            />
            <Button
              text={<FaPhone />}
              className="icon"
              dataLabel="phone"
              onMouseOver={handleValue}
            />
            <Button
              text={<FaLock />}
              className="icon"
              dataLabel="password"
              onMouseOver={handleValue}
            />
          </div>
          <Button
            text={loading ? "loading..." : "random user"}
            className="btn"
            type="button"
            onClick={getPerson}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
