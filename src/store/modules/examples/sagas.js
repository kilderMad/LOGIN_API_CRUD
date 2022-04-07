import { call, put, all, takeLatest } from 'redux-saga/effects'

const requisicao = () => new Promise((resolve, reject) => {
  setTimeout(()=>{
    resolve();
  }, 2000)
})

function* exampleRequest() {
  try {
    yield call(requisicao)
    yield put()//action de sucesso
  }catch {
    yield put()//action de failed
  }
}

export default all([
  takeLatest(exampleRequest)//qual o tipo que sera chamado e a funcao acima
])
