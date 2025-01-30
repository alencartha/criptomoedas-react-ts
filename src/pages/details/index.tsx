import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { CryptoDataProp } from '../home'

interface ResponseData {
  data: CryptoDataProp
}

interface ErrorData {
  error: string;
}

type DataProps = ResponseData | ErrorData


export function Details() {

  const {cripto} = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<CryptoDataProp>()

  useEffect(() => {
    async function getCoin(){
      try{
        fetch(`https://api.coincap.io/v2/assets/${cripto}`)
        .then(response => response.json())
        .then((data: DataProps) => {
          
          if("error" in data){
            navigate("/")
            return;
          }

          const price = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          })
    
          const priceCompact = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact"
          })

          const resultData = {
            ...data.data,
            formatedPrice: price.format(Number(data.data.priceUsd)),
            formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
            formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr))
          }

          setCoin(resultData)

        })


      }catch(err){
        console.log(err);
        navigate("/")
      } 
    }

    getCoin();
  }, [cripto])

  return (
    <div>
      <h1>Pagina Details {coin?.explorer} </h1>
    </div>
  );
}
