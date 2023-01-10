import { postDbExpression } from '@services/dbExpressions';
import { getDbExpression } from '@services/dbExpressions';
import { deleteExpression } from '@services/dbExpressions';
import { favoriteExpression } from '@services/dbExpressions';
import api from '@services/api';

jest.mock('@services/guides');
jest.mock('@services/api');

const apiMock = api as jest.Mocked<typeof api>;

describe('Testando o serviço "postDbExpression"', () => {
  beforeEach(() => {
    apiMock.post.mockClear();
  });
  const expression = 'Teste da expression DbInclui';
  const token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3NTNiYmFiM2U4YzBmZjdjN2ZiNzg0ZWM5MmY5ODk3YjVjZDkwN2QiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWxpY2lhIFMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNmdDd0l6Q1FPOF9Sci1GYW1PblBJeXFsbkdnVWFHUWl3eDBOcW9PVEk9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGVhcm5pbmctZmlyZWJhc2UtMzZkMWIiLCJhdWQiOiJsZWFybmluZy1maXJlYmFzZS0zNmQxYiIsImF1dGhfdGltZSI6MTY3MjE2MDM1OSwidXNlcl9pZCI6IklXM09wRFluZEpkWVViOU8yYUZ5SzdJa2t5djEiLCJzdWIiOiJJVzNPcERZbmRKZFlVYjlPMmFGeUs3SWtreXYxIiwiaWF0IjoxNjcyMTYwMzU5LCJleHAiOjE2NzIxNjM5NTksImVtYWlsIjoiYWxpY2lhLnJzb3V6YUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMTMyODMzOTM1Njg2NTc3MDkzNyJdLCJlbWFpbCI6WyJhbGljaWEucnNvdXphQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.bkuKrT9woY1_u2OxgwFA-RUnxkNkqtrUsF6zBY_33u4q_TL6Nub_DS_MH_of_pB9LHFtgr0xyi-BIEN27U5yZbtGGyLsPQ8dwIv-hCPdXpCzZJk2UuGN54d2Fewe0_D722twclyjQ-70B_z2abFrDSYr2yMiduWbay8L0Q1jXvQuRWsIWzHx18qt95x07y5SqUiaCg82rmTYkkIJu1ygyH88zlDBAHxhKQFiuEsTZ8jBau5Wotu2j_ZMeFNhTwGZkxD9hjbNEqlos02vSAcAnacgInPc-_0PtI4nRJa8lwyMr-4UkWfF9LDuNlM5R6U0UV-3nKreEjFHs2f7KQxpbA';

  const resultExpect = true;

  apiMock.post.mockResolvedValue(resultExpect);

  test(`Quando ${postDbExpression.name} é chamado, o resultado deve retornar true, mostrando que o serviço está funcionando.`, async () => {
    const result = await postDbExpression(expression, token);

    expect(result).toBe(resultExpect);
  });
});

describe('Testando o serviço "getDBExpression"', () => {
  beforeEach(() => {
    apiMock.get.mockClear();
  });

  const resultExpect = true;

  apiMock.get.mockResolvedValue(resultExpect);

  test(`Quando ${getDbExpression.name} é chamado, o resultado deve retornar true, mostrando que o serviço está funcionando.`, async () => {
    const result = await getDbExpression();
    expect(result).toBe(resultExpect);
  });
});

describe('Testando o serviço "deleteDBExpression"', () => {
  beforeEach(() => {
    apiMock.patch.mockClear();
  });
  const idItem = '63bc1941e62c6644773b98e5';
  const token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1NWU0ZDkxOGE0ODY0YWQxMzUxMDViYmRjMDEwYWY5Njc5YzM0MTMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTHVjYXMgR2FicmllbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BRWRGVHA3T2hueE1PRmVXYXU4S2tJRE5KMnB4MXhmZW9EV3hsS1dDcFlEMUFBPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2xlYXJuaW5nLWZpcmViYXNlLTM2ZDFiIiwiYXVkIjoibGVhcm5pbmctZmlyZWJhc2UtMzZkMWIiLCJhdXRoX3RpbWUiOjE2NzMxODAwNTMsInVzZXJfaWQiOiJGQ29wbk9rVUVGT2N4SFlnMWlNN0p5VmZBNTcyIiwic3ViIjoiRkNvcG5Pa1VFRk9jeEhZZzFpTTdKeVZmQTU3MiIsImlhdCI6MTY3MzI3MDg0MCwiZXhwIjoxNjczMjc0NDQwLCJlbWFpbCI6Imx1Y2FzZ25hbTEyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA2MzQyNTc1OTk3NDc4NzY4MTAxIl0sImVtYWlsIjpbImx1Y2FzZ25hbTEyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.nXDGIFPFbocyBukioDekey1gDkDRNBcszxG0xa_bfNehvomjJkoZeaE8RHwGuUdyDM9pf0PD8Qm26N0mPlopa9QBSv_RrLnYg49Tusti_YuimvpMCVxFmrWt6QcWZAWwfsuNyVYiUEUmARZOa6Dj-VYAGW6FU4HrVioauMmtyNb1sFojGHh3oqRlgd-JvemspLAh8dgatywgDvI9BuUiLVyg3TruNJfkZDTxVze-GHcoepZttKoQtC_zEd-t5aRIa-F63_lYbvTjPurO4aP3CBYwn12zIz7hltZdvVIskic0zStmVqZwBPdSHFTZ5nrnMdpJ1UAPAKJjMuK6Use7EA';
  const resultExpect = true;

  apiMock.patch.mockResolvedValue(resultExpect);

  test(`Quando ${deleteExpression.name} é chamado, o resultado deve retornar true, mostrando que o serviço está funcionando.`, async () => {
    const result = await deleteExpression(idItem, token);
    expect(result).toBe(resultExpect);
  });
});

describe('Testando o serviço "favoriteExpression"', () => {
  beforeEach(() => {
    apiMock.patch.mockClear();
  });
  const idItem = '63bc1941e62c6644773b98e5';
  const token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1NWU0ZDkxOGE0ODY0YWQxMzUxMDViYmRjMDEwYWY5Njc5YzM0MTMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTHVjYXMgR2FicmllbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BRWRGVHA3T2hueE1PRmVXYXU4S2tJRE5KMnB4MXhmZW9EV3hsS1dDcFlEMUFBPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2xlYXJuaW5nLWZpcmViYXNlLTM2ZDFiIiwiYXVkIjoibGVhcm5pbmctZmlyZWJhc2UtMzZkMWIiLCJhdXRoX3RpbWUiOjE2NzMxODAwNTMsInVzZXJfaWQiOiJGQ29wbk9rVUVGT2N4SFlnMWlNN0p5VmZBNTcyIiwic3ViIjoiRkNvcG5Pa1VFRk9jeEhZZzFpTTdKeVZmQTU3MiIsImlhdCI6MTY3MzI3MDg0MCwiZXhwIjoxNjczMjc0NDQwLCJlbWFpbCI6Imx1Y2FzZ25hbTEyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA2MzQyNTc1OTk3NDc4NzY4MTAxIl0sImVtYWlsIjpbImx1Y2FzZ25hbTEyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.nXDGIFPFbocyBukioDekey1gDkDRNBcszxG0xa_bfNehvomjJkoZeaE8RHwGuUdyDM9pf0PD8Qm26N0mPlopa9QBSv_RrLnYg49Tusti_YuimvpMCVxFmrWt6QcWZAWwfsuNyVYiUEUmARZOa6Dj-VYAGW6FU4HrVioauMmtyNb1sFojGHh3oqRlgd-JvemspLAh8dgatywgDvI9BuUiLVyg3TruNJfkZDTxVze-GHcoepZttKoQtC_zEd-t5aRIa-F63_lYbvTjPurO4aP3CBYwn12zIz7hltZdvVIskic0zStmVqZwBPdSHFTZ5nrnMdpJ1UAPAKJjMuK6Use7EA';
  const resultExpect = true;

  apiMock.patch.mockResolvedValue(resultExpect);

  test(`Quando ${favoriteExpression.name} é chamado, o resultado deve retornar true, mostrando que o serviço está funcionando.`, async () => {
    const result = await favoriteExpression(idItem, token);
    expect(result).toBe(resultExpect);
  });
});
