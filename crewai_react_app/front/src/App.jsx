import './App.css';
import styled from 'styled-components';
import InputGroup from './components/InputGroup';
import { useState } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

const AppContainer = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Helvetica', sans-serif;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 40px;
  color: #666;
  font-size: 1.2rem;
`;

const Error = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setTopic(e.target.value);
  };

  const fetchData = async () => {
    setResult(null);
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/crewai', {
        topic: topic,
      });
      setResult(response.data);
    } catch (error) {
      setError(error.response ? error.response.data.error : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer>
      <Header>Crew AI 블로그 콘텐츠 생성기</Header>
      <Description>
        주제에 맞는 블로그 콘텐츠를 생성하기 위한 에이전트를 이용해 보세요.
      </Description>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <InputGroup
            loading={loading}
            handleInputChange={handleInputChange}
            topic={topic}
            fetchData={fetchData}
          />
          {error && <Error>{error}</Error>}
        </>
      )}
    </AppContainer>
  );
}

export default App;
