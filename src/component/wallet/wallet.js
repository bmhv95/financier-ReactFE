import { useState } from "react";
import WalletsService from "../../service/wal.service";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Wallet(){
    const [wallets, setWallets] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    if(!isLoaded){
        WalletsService.getAllWallets().then((response) => {
            setWallets(response.data);
            setIsLoaded(true);
        });
    }

    const total = wallets.reduce((total, wallet) => total + wallet.balance, 0);

    return(
        <div id="walletNavBar" className="border border-black border-rounded bg-success-subtle p-1" onClick={() => alert("Wallets")}>
            <h2>${total}</h2>
        </div>
    )
}