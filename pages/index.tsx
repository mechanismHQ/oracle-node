import Head from 'next/head'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import { getPriceInfo } from '@common/oracle';
import { config, tokenDecimals } from '@common/config';
import { getCurrentBlockHeight } from '@common/stacks';
import { getPublicKey, isOracleTrusted } from '@common/helpers';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const [blockHeight, setBlockHeight] = useState(true);
  const [trustedOracle, setTrustedOracle] = useState(true);
  const [publicKey, setPublicKey] = useState("");

  const [stxPrice, setStxPrice] = useState({});
  const [xstxPrice, setXstxPrice] = useState({});
  const [btcPrice, setBtcPrice] = useState({});
  const [dikoPrice, setDikoPrice] = useState({});
  const [usdaPrice, setUsdaPrice] = useState({});
  const [atAlexPrice, setAtAlexPrice] = useState({});

  useEffect(() => {
    const fetchInfo = async () => {
      const [
        currentBlock,
        oracleTrusted,
        priceStx,
        priceXstx,
        priceBtc,
        priceDiko,
        priceUsda,
        priceAtAlex
      ] = await Promise.all([
        getCurrentBlockHeight(),
        isOracleTrusted(),
        getPriceInfo("STX"),
        getPriceInfo("xSTX"),
        getPriceInfo("xBTC"),
        getPriceInfo("DIKO"),
        getPriceInfo("USDA"),
        getPriceInfo("auto-alex"),
      ]);
      setBlockHeight(currentBlock);
      setTrustedOracle(oracleTrusted);

      setStxPrice(priceStx);
      setXstxPrice(priceXstx);
      setBtcPrice(priceBtc);
      setDikoPrice(priceDiko);
      setUsdaPrice(priceUsda);
      setAtAlexPrice(priceAtAlex);

      setPublicKey(getPublicKey());
      setIsLoading(false);
    };

    fetchInfo();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Arkadiko Oracle Node</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://arkadiko.finance/">Arkadiko</a> Oracle Node
        </h1>

        <p className={styles.description}>
          Multisig oracle solution on Stacks.
        </p>

        {isLoading ? (
          <p>
            Loading oracle prices..
          </p>
        ) : (
          <>
            <h3>Public Key</h3>
            {publicKey}
            <br/><br/><br/>

            <h3>Config</h3>
            <table>
              <tbody>
                <tr>
                  <td style={{width: "200px", textAlign: "right", paddingRight: "10px"}}>Trusted</td>
                  <td style={{width: "200px", paddingLeft: "10px"}}><b>{trustedOracle ? "yes" : "NO!"}</b></td>
                </tr>
                <tr>
                  <td style={{width: "200px", textAlign: "right", paddingRight: "10px"}}>Network</td>
                  <td style={{width: "200px", paddingLeft: "10px"}}><b>{config.network.isMainnet() ? "mainnet" : "testnet"}</b></td>
                </tr>
                <tr>
                  <td style={{textAlign: "right", paddingRight: "10px"}}>Source</td>
                  <td style={{paddingLeft: "10px"}}><b>{config.sourceName}</b></td>
                </tr>
                <tr>
                  <td style={{textAlign: "right", paddingRight: "10px"}}>Max block diff</td>
                  <td style={{paddingLeft: "10px"}}><b>{config.inputMaxBlockDiff}</b></td>
                </tr>
                <tr>
                  <td style={{textAlign: "right", paddingRight: "10px"}}>Max price diff</td>
                  <td style={{paddingLeft: "10px"}}><b>{config.inputMaxPriceDiff}</b></td>
                </tr>
              </tbody>
            </table>
            <br/><br/><br/>

            <h3>Oracle</h3>
            <table style={{textAlign: "center"}}>
              <tbody>
                <tr>
                  <td style={{width: "100px"}}><b>Symbol</b></td>
                  <td style={{width: "150px"}}><b>Decimals</b></td>
                  <td style={{width: "200px"}}><b>Last Updated</b></td>
                  <td style={{width: "300px"}}><b>Price</b></td>
                </tr>
                <tr>
                  <td>STX</td>
                  <td>{stxPrice['decimals'].value}</td>
                  <td>{stxPrice['last-block'].value} ({blockHeight - stxPrice['last-block'].value} blocks ago)</td>
                  <td>{stxPrice['last-price'].value} (${stxPrice['last-price'].value / Math.pow(10, tokenDecimals["STX"])})</td>
                </tr>
                <tr>
                  <td>xSTX</td>
                  <td>{xstxPrice['decimals'].value}</td>
                  <td>{xstxPrice['last-block'].value} ({blockHeight - xstxPrice['last-block'].value} blocks ago)</td>
                  <td>{xstxPrice['last-price'].value} (${xstxPrice['last-price'].value / Math.pow(10, tokenDecimals["STX"])})</td>
                </tr>
                <tr>
                  <td>xBTC</td>
                  <td>{btcPrice['decimals'].value}</td>
                  <td>{btcPrice['last-block'].value} ({blockHeight - btcPrice['last-block'].value} blocks ago)</td>
                  <td>{btcPrice['last-price'].value} (${btcPrice['last-price'].value / Math.pow(10, tokenDecimals["BTC"])})</td>
                </tr>
                <tr>
                  <td>DIKO</td>
                  <td>{dikoPrice['decimals'].value}</td>
                  <td>{dikoPrice['last-block'].value} ({blockHeight - dikoPrice['last-block'].value} blocks ago)</td> 
                  <td>{dikoPrice['last-price'].value} (${dikoPrice['last-price'].value / Math.pow(10, tokenDecimals["DIKO"])})</td>
                </tr>
                <tr>
                  <td>USDA</td>
                  <td>{usdaPrice['decimals'].value}</td>
                  <td>{usdaPrice['last-block'].value} ({blockHeight - usdaPrice['last-block'].value} blocks ago)</td>
                  <td>{usdaPrice['last-price'].value} (${usdaPrice['last-price'].value / Math.pow(10, tokenDecimals["USDA"])})</td>
                </tr>
                <tr>
                  <td>atALEX</td>
                  <td>{atAlexPrice['decimals'].value}</td>
                  <td>{atAlexPrice['last-block'].value} ({blockHeight - atAlexPrice['last-block'].value} blocks ago)</td>
                  <td>{atAlexPrice['last-price'].value} (${atAlexPrice['last-price'].value / Math.pow(10, tokenDecimals["auto-alex"])})</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

      </main>
    </div>
  )
}
