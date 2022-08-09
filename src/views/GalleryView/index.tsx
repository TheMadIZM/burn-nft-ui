import Link from "next/link";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";

import { SolanaLogo, SelectAndConnectWalletButton } from "components";
import { NftCard } from "./NftCard";
import styles from "./index.module.css";
import { BurnButton } from "utils/BurnButton";

const walletPublicKey = "";

export const GalleryView: FC = ({ }) => {
  const { connection } = useConnection();
  const [walletToParsePublicKey, setWalletToParsePublicKey] =
    useState<string>(walletPublicKey);
  const { publicKey } = useWallet();
  
  const [refresh, setRefresh] = useState(false)

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletToParsePublicKey,
    connection,
  });

  let errorMessage
  if (error) {
    errorMessage = error.message
  }

  console.log("nfts", nfts);

  const onUseWalletClick = () => {
    if (publicKey) {
      setWalletToParsePublicKey(publicKey?.toBase58());
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div className={styles.container}>
        <div className="navbar mb-2 shadow-lg bg-red text-gray-content rounded-box">
          <div className="flex-1 px-2 mx-2">
            <div className="text-2xl">
              <ul className="text-2xl">
                <li>
                  <Link href="https://burn.izmlabs.xyz/">
                    <a>Welcome to the IZ-CINERATOR!</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-none">
            <WalletMultiButton className="btn btn-ghost" />
          </div>
        </div>
        
        <div className="text-center pt-2">
          <div className="hero min-h-16 p-0 pt-10">
            <div className="text-center hero-content w-full">
              <div className="w-full">
                <h1 className="mb-5 text-5xl">
                  Burn unwanted <SolanaLogo /> NFTs!
                </h1>

                <div className="w-full min-w-full">
                  <div>
                    <div className="form-control mt-8">
                      <label className="input-group input-group-vertical input-group-lg">

                        <div className="flex space-x-2">
                          <input
                            readOnly
                            type="text"
                            placeholder="..."
                            className="w-full input input-bordered input-lg"
                            value={walletToParsePublicKey}
                            style={{
                              borderRadius:
                                "0 0 var(--rounded-btn,.5rem) var(--rounded-btn,.5rem)",
                            }}
                          />

                          <SelectAndConnectWalletButton
                            onUseWalletClick={onUseWalletClick}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-auto my-10">
                  {error && errorMessage != "Invalid address: " ? (
                    <div>
                      <h1>Error</h1>
                      {(error as any)?.message}
                    </div>
                  ) : null}

                  {!error && isLoading &&
                    <div>
                    </div>
                  }
                  {!error && !isLoading && !refresh &&
                    <NftList nfts={nfts} error={error} setRefresh={setRefresh} />
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type NftListProps = {
  nfts: NftTokenAccount[];
  error?: Error;
  setRefresh: Dispatch<SetStateAction<boolean>>
};

const NftList = ({ nfts, error, setRefresh }: NftListProps) => {
  if (error) {
    return null;
  }

  if (!nfts?.length) {
    return (
      <div className="text-center text-2xl pt-16">
        No NFTs found...
      </div>
    );
  }

  const NFTstoBurn: string[] = []
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const wallet = useWallet();

  return (
    <div>
      <ul className="text-center font-semibold text-l mb-4">
        <li className=" mb-6"><span className='text-[#16c60c] font-semibold'></span> The Iz-cinerator will load token your token accounts, allow you to choose which ones you want to close, and return the rent! (About .00204 SOL!)</li>
        <li className=" mb-10"><span className='text-[#F03A17] font-semibold'></span>Some token accounts may not provide a title, picture, etc. Please refer to Solscan in order to ensure identity.</li>
        <li className=" mb-16"><span className='text-[#ff7f00] font-bold'></span>Please be careful, and use at your discretion, as burns are irreversible.</li>
      </ul>

      <BurnButton toBurn={NFTstoBurn} connection={connection} publicKey={publicKey} wallet={wallet} setRefresh={setRefresh} />

      <div className="grid grid-cols-2 pt-14 md:grid-cols-4 gap-14 items-start">
        {nfts?.map((nft) => (
          <NftCard key={nft.mint} details={nft} onSelect={() => { }} toBurn={NFTstoBurn} />
        ))}
      </div>
    </div>
  );
};
