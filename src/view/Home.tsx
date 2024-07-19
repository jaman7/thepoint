import HttpService from 'core/http/http.service';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import './Home.scss';

interface IData {
  name?: string;
  hair_color?: string;
  height?: string;
  [name: string]: any;
}

interface IRestData {
  count: number;
  next: string;
  previous: null;
  results?: IData[];
}

const StyledTableRow = styled.tr<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? 'red' : 'black')};
`;

const Home = () => {
  const [data, setData] = useState<IData[]>([]);
  const [clickedRow, setClickedRow] = useState<string | null>(null);

  const http = new HttpService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myData: IRestData = await http.get('https://swapi.dev/api/people/');
        if (myData.results) {
          const formattedData = myData.results.map(({ name, hair_color, height }) => ({ name, hair_color, height }));
          setData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const tableHeader = ['Name', 'Height', 'Hair color'];

  const changeColor = (name: string) => {
    setClickedRow(prevName => (prevName === name ? null : name));
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {tableHeader.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.name} className={clickedRow === item.name ? 'active-row' : ''} onClick={() => changeColor(item?.name ?? '')}>
            <td>{item.name}</td>
            <td>{item.height}</td>
            <td>{item.hair_color}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Home;
