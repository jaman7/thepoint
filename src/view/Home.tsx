import HttpService from 'core/http/http.service';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { StyledTableRow } from 'shared/components/styled';

interface IData {
  name?: string;
  hair_color?: string;
  height?: string;
  [key: string]: any;
}

interface IRestData {
  count: number;
  next: string;
  previous: null;
  results?: IData[];
}

const Home = () => {
  const [data, setData] = useState<IData[]>([]);
  const [activeRows, setActiveRows] = useState<Set<string>>(new Set());

  const http = new HttpService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myData: IRestData = await http.get('https://swapi.dev/api/people/');
        if (myData?.results) {
          const formattedData = myData.results.map(({ name, hair_color, height }) => ({ name, hair_color, height })) ?? [];
          setData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [http]);

  const tableHeader = useMemo(() => ['Name', 'Height', 'Hair color'], []);

  const toggleRowColor = useCallback((name: string) => {
    setActiveRows(prevActiveRows => {
      const newActiveRows = new Set(prevActiveRows);
      if (newActiveRows.has(name)) {
        newActiveRows.delete(name);
      } else {
        newActiveRows.add(name);
      }
      return newActiveRows;
    });
  }, []);

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
        {data?.map(item => (
          <StyledTableRow key={item.name} isActive={activeRows.has(item.name || '')} onClick={() => toggleRowColor(item.name || '')}>
            <td>{item.name}</td>
            <td>{item.height}</td>
            <td>{item.hair_color}</td>
          </StyledTableRow>
        ))}
      </tbody>
    </table>
  );
};

export default Home;
