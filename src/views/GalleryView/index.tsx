import Link from "next/link";
import { FC, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";

import { Loader, SolanaLogo, SelectAndConnectWalletButton } from "components";
import { NftCard } from "./NftCard";
import styles from "./index.module.css";

const walletPublicKey = "";

export const GalleryView: FC = ({}) => {
  const { connection } = useConnection();
  const [walletToParsePublicKey, setWalletToParsePublicKey] =
    useState<string>(walletPublicKey);
  const { publicKey } = useWallet();

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletToParsePublicKey,
    connection,
  });

  console.log("nfts", nfts);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWalletToParsePublicKey(value.trim());
  };

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
                  <Link href="https://incinerator.izmlabs.xyz/">
                    <a>Welcome to the IZ-INERATOR!</a>
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
                <h1 className="mb-6 text-6xl">
                  Burn your unwanted <SolanaLogo /> NFTs!
                </h1>
                <h1 className="mb-2 text-m">
                  This will load token accounts, allow you to choose which ones you want to close, and return the rent! (Ususally about .002 SOL)
                </h1>
                <h1 className="mb-10 text-m">
                  Some accounts may not load. Please be careful, and use at your discretion, as burns are irreversible.
                </h1>
                
                <div className="w-full min-w-full">
                  <div>
                    <div className="form-control mt-8">
                      <label className="input-group input-group-vertical input-group-lg">

                        <div className="flex space-x-2">
                          <input
                            readOnly
                            type="text"
                            placeholder="Please, connect your wallet"
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
                  {error ? (
                    <div>
                      <h1></h1>
                      {(error as any)?.message}
                    </div>
                  ) : null}

                  {!error && isLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <NftList nfts={nfts} error={error} />
                  )}
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
};

const NftList = ({ nfts, error }: NftListProps) => {
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {nfts?.map((nft) => (
        <NftCard key={nft.mint} details={nft} onSelect={() => {}} />
      ))}
    </div>
  );
};
