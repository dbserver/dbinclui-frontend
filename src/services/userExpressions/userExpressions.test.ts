import { postUserExpression } from '@services/userExpressions';
  import api from '@services/api';
  
  jest.mock('@services/guides');
  jest.mock('@services/api');
  
const apiMock = api as jest.Mocked<typeof api>;

describe('Testando o serviço "postExpression"', () => {
    beforeEach(() => {
      apiMock.post.mockClear();
    });
    const expression = "Teste da expression"
    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3NTNiYmFiM2U4YzBmZjdjN2ZiNzg0ZWM5MmY5ODk3YjVjZDkwN2QiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWxpY2lhIFMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNmdDd0l6Q1FPOF9Sci1GYW1PblBJeXFsbkdnVWFHUWl3eDBOcW9PVEk9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGVhcm5pbmctZmlyZWJhc2UtMzZkMWIiLCJhdWQiOiJsZWFybmluZy1maXJlYmFzZS0zNmQxYiIsImF1dGhfdGltZSI6MTY3MjE2MDM1OSwidXNlcl9pZCI6IklXM09wRFluZEpkWVViOU8yYUZ5SzdJa2t5djEiLCJzdWIiOiJJVzNPcERZbmRKZFlVYjlPMmFGeUs3SWtreXYxIiwiaWF0IjoxNjcyMTYwMzU5LCJleHAiOjE2NzIxNjM5NTksImVtYWlsIjoiYWxpY2lhLnJzb3V6YUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMTMyODMzOTM1Njg2NTc3MDkzNyJdLCJlbWFpbCI6WyJhbGljaWEucnNvdXphQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.bkuKrT9woY1_u2OxgwFA-RUnxkNkqtrUsF6zBY_33u4q_TL6Nub_DS_MH_of_pB9LHFtgr0xyi-BIEN27U5yZbtGGyLsPQ8dwIv-hCPdXpCzZJk2UuGN54d2Fewe0_D722twclyjQ-70B_z2abFrDSYr2yMiduWbay8L0Q1jXvQuRWsIWzHx18qt95x07y5SqUiaCg82rmTYkkIJu1ygyH88zlDBAHxhKQFiuEsTZ8jBau5Wotu2j_ZMeFNhTwGZkxD9hjbNEqlos02vSAcAnacgInPc-_0PtI4nRJa8lwyMr-4UkWfF9LDuNlM5R6U0UV-3nKreEjFHs2f7KQxpbA"

    const pathExpect = '/usersExpressions/';
    const structureExpression = {expression}

    const resultExpect = true;

    apiMock.post.mockResolvedValue(resultExpect);
  
    test(`Quando ${postUserExpression.name} é chamado, o resultado deve retornar true, mostrando que o serviço está funcionando.`, async () => {
        
      const result = await postUserExpression(expression,token);
        
      expect(result).toBe(resultExpect);

    })});

