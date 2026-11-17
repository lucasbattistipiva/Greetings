"use client"

import { useEffect, useState } from "react";

const Page = () => {
  const [hour, setHour] = useState<number | null>(null);
  const [date, setDate] = useState<number>(0);
  const [fullDate, setFullDate] = useState("");
  const [fulltime, setFullTime] = useState("");
  const [running, setRunning] = useState(true); //true pro relógio funcionar

  useEffect(() => {
    if (!running) return;
    const updateClock = () => {
      const now = new Date();
      setHour(now.getHours());
      setDate(now.getDate());
      setFullDate(new Intl.DateTimeFormat('pt-BR', { dateStyle: "full" }).format(now));
      setFullTime(new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now));
    };

    updateClock();
    
    const myInterval = setInterval(updateClock, 1000);

    return () =>{
      clearInterval(myInterval);
    };

  }, [running]);

  let greeting = "";

    if (hour !== null) {
      if (hour >= 0 && hour < 12) {
        greeting = '🌅 Bom dia!';
      } else if (hour >= 12 && hour < 18) {
        greeting = '☀️ Boa tarde!';
      } else {
        greeting = '🌙 Boa noite!';
      }
    }
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center text-white
      bg-gradient-to-r from-sky-500 to-indigo-500">
        <div className="text-9xl">{fulltime || '--:--:--'}</div>
        <div className="text-3xl font-bold">
          {greeting || "Carregando..."}
        </div>
        <div className="mt-3 text-lg">
          {fullDate}
        </div>
        <button onClick={() => setRunning(!running)} className="mt-8 rounded-lg bg-white text-indigo-700 px-6 py-3 font-bold hover:bg-gray-200">{running ? "Parar Relógio" : "Iniciar Relógio"}</button>
      </div>
    );


}



export default Page;