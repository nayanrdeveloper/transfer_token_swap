import "../styles/globals.css";
import type { AppProps } from "next/app";
import "windi.css";
import NavBar from "../components/NavBar/NavBar";

import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
  Chain
} from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const avalancheChain: Chain[] = [
  {
    id: 80001,
    name: 'Mumbai',
    network: 'mumbai',
    nativeCurrency: {
      decimals: 18,
      name: 'matic',
      symbol: 'MATIC',
    },
    rpcUrls: {
      default: 'https://matic-mumbai.chainstacklabs.com',
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: 'https://mumbai.polygonscan.com/' },
    },
    testnet: true,
  },
  {
    id: 44787,
    name: 'Celo (Alfajores Testnet)',
    network: 'celo alfajores',
    nativeCurrency: {
      decimals: 18,
      name: 'celo',
      symbol: 'CELO',
    },
    rpcUrls: {
      default: 'https://alfajores-forno.celo-testnet.org',
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: 'https://alfajores-blockscout.celo-testnet.org/' },
    },
    testnet: true,
  },
  {
    id: 53,
    name: 'CoinEx',
    network: 'coinex',
    nativeCurrency: {
      decimals: 18,
      name: 'coinex',
      symbol: 'tCET',
    },
    rpcUrls: {
      default: 'https://testnet-rpc.coinex.net',
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: 'https://testnet.coinex.net/' },
    },
    testnet: true,
  },
  {
    id: 5,
    name: 'Goerli',
    network: 'goerli',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'GoerliETH',
    },
    rpcUrls: {
      default: 'https://goerli.infura.io/v3/',
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: 'https://goerli.etherscan.io' },
    },
    testnet: true,
  }
]

const { chains, provider } = configureChains(avalancheChain, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || "", priority: 1 }),
  infuraProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || "" }),
  jsonRpcProvider({
    rpc: (chain) => ({
      http: `https://${chain.id}.example.com`,
      webSocket: `wss://${chain.id}.example.com`,
    }),
  }),
],);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <WagmiConfig client={client}>
        <NavBar />
        <Component {...pageProps} />
      </WagmiConfig>
    </div>
  );
}

export default MyApp;
