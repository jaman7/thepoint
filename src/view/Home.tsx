import HttpService from 'core/http/http.service';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IData {
  name: string;
  hair_color: string;
  height: string;
}

const Home = () => {
  const [data, setData] = useState<IData[]>([]);

  const [color, setColor] = useState<string>('blue');

  const navigate = useNavigate();

  const http = new HttpService();

  useEffect(() => {
    http.get('https://swapi.dev/api/people/').then(myData => {
      setData(
        myData?.results?.map(item => {
          const { name, hair_color, height } = item ?? {};
          return { name, hair_color, height };
        }) ?? []
      );
    });
  }, []);

  const tableHeader = ['name', 'Height', 'Skin color'];

  const changeColor = () => {
    setColor(color => (color === 'blue' ? 'red' : 'blue'));
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {tableHeader.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.name}>
              <td onClick={() => changeColor()}>{item?.name}</td>
              <td>{item?.height}</td>
              <td>{item?.hair_color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
