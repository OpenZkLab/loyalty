"use client";

import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import Image from 'next/image';

interface CachedProof {
    label: string;
    value: string;
    date: string;
    conditionType: string;
    dataType: string;
}
interface CompanyDataProofs {
    transactionName: string;
    conditionalValue: string;
    anterorityDate: string;
    conditionType: string;
    dataType: string;
}

export default function LoyaltyProof() {
    const [selectedValuesWeb2orWeb3, setSelectedValuesWeb2orWeb3] = useState<string[]>([]);
    const [companySelected, setCompanySelected] = useState<CachedProof | null>(null);
    const [cachedProofs, setCachedProofs] = useState<CachedProof[]>([]); // State to store cached data

    const handleCompanyChange = (selectedKey: React.Key) => { // Get the company selected
        console.log('cachedProofs', cachedProofs)
        const selectedCompanyObject = cachedProofs.find(proof => proof.label === selectedKey);

        if (selectedCompanyObject) {
            // Assuming you want to store the full object in your state
            setCompanySelected(selectedCompanyObject);
            console.log('Company Selected:', selectedCompanyObject);
        } else {
            console.log('Selected company not found in cached proofs');
        }
    };

    useEffect(() => {
        // Load cached data on component mount
        const loadedData = localStorage.getItem('companyDataProofs');
        if (loadedData) {
            const parsedData: CompanyDataProofs[] = JSON.parse(loadedData);
            const cachedNames = parsedData.map((item) => ({
                label: item.transactionName,
                value: item.conditionalValue,
                date: item.anterorityDate,
                conditionType: item.conditionType,
                dataType: item.dataType,
            }));
            setCachedProofs(cachedNames);
        }
    }, []);

    const handleGenerateProofTransaction = async () => {
        if (companySelected) {
            localStorage.setItem('selectedCompany_FidelityProof', JSON.stringify(companySelected)); // For the dashboard to do the verification
            console.log('companySelected', companySelected);

            console.log('Redirecting to auth URL for web2...');
            window.location.href = `https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/auth/webview/connect?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;

        } else {
            // Need to call etherscan API
        }
    };

    return (
        <div className='bg-blue-100'>
            <div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
                <Header />
                <main className="flex-grow">
                    <section className='flex flex-col relative my-10'>
                        <div className="flex flex-row items-start ml-20 mb-10 space-x-4">
                            <div className="flex-1 px-4 mb-12 z-10">
                                <h2 className="text-6xl text-white font-sans font-bold leading-tight responsive-heading">
                                    Rewarding Loyalty
                                </h2>
                                <h1 className="text-6xl text-white font-sans font-bold leading-tight responsive-heading">
                                    With Privacy.
                                </h1>
                            </div>
                        </div>
                        <div
                            className="absolute left-1/2 transform -translate-x-1/2  translate-y-40"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(212,137,127,1) 0%, rgba(201,117,156,1) 100%)',
                                filter: 'blur(180px)',
                                width: '660px',
                                height: '660px',
                            }}
                        />
                        <div
                            className="absolute left-1/2 transform translate-x-60 -translate-y-30"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(135,203,208,1) 100%, rgba(190,232,235,1) 0%)',
                                filter: 'blur(180px)',
                                width: '530px',
                                height: '530px',
                            }}
                        />
                        <div className="flex justify-center items-center px-16 pb-12">
                            <Card isBlurred className="mx-auto py-4 bg-lavender bg-opacity-75 max-w-lg w-full">
                                <CardHeader className="pb-5 pt-2 px-4 flex flex-col items-center justify-center text-center">
                                    <p className="text-3xl font-bold pb-4">Loyalty</p>
                                    <small className="text-gray-900 text-sm">Connect your bank account to the app to prove your payments.</small>
                                </CardHeader>
                                <CardBody className="overflow-visible py-2 px-10">
                                    <div key={'bordered'} className="flex flex-col w-full mb-6 gap-4">
                                        <Autocomplete
                                            placeholder='Binance'
                                            className="mb-4"
                                            variant={'bordered'}
                                            onSelectionChange={handleCompanyChange}
                                            startContent={
                                                <Image
                                                    src="/images/icon/search.svg"
                                                    alt="Logo"
                                                    width={24}
                                                    height={24}
                                                    className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
                                                />}
                                        >
                                            {cachedProofs.map((Proofs) => (
                                                <AutocompleteItem key={Proofs.label} value={Proofs.label} className='text-black'>
                                                    {Proofs.label}
                                                </AutocompleteItem>
                                            ))}
                                        </Autocomplete>
                                    </div>
                                </CardBody>
                                <CardFooter className="flex flex-col justify-center items-center space-y-2">
                                    <Button onClick={() => handleGenerateProofTransaction()} className='bg-tiffany_blue' size="lg" aria-label="Generate proof" >
                                        Start
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </section>
                </main >
            </div >
        </div >
    );
}