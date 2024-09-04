import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [miscritOne, setMiscritOne] = useState({hp: 1, sp: 1, ea: 1, ed: 1, pa: 1, pd: 1})
  const [miscritTwo, setMiscritTwo] = useState({hp: 1, sp: 1, ea: 1, ed: 1, pa: 1, pd: 1})
  const [miscritThree, setMiscritThree] = useState({hp: 1, sp: 1, ea: 1, ed: 1, pa: 1, pd: 1})
  const miscritRating = ["F-", "F", "F+", "D", "D+", "C", "C+", "B", "B+", "A", "A+", "S", "S+"]
  const miscritRatingText = ["Fminus", "F", "Fplus", "D", "Dplus", "C", "Cplus", "B", "Bplus", "A", "Aplus", "S", "Splus"]
  const [probabilities, setProbabilities] = useState({splus: 0, s: 0, aplus: 0, a: 0, bplus: 0, b: 0, cplus: 1, c: 0, dplus: 0, d:0, fplus: 0, f: 0, fminus: 0}) 

  function handleStats (miscrit, stat) {
    let miscritStat = stat.target.textContent.toLowerCase()
    if (miscrit == 1) {
      if (miscritOne[miscritStat] == 0) setMiscritOne({...miscritOne, [miscritStat]: 1})
      else if (miscritOne[miscritStat] == 1) setMiscritOne({...miscritOne, [miscritStat]: 2})
      else if (miscritOne[miscritStat] == 2) setMiscritOne({...miscritOne, [miscritStat]: 0})
    }
    else if (miscrit == 2) {
      if (miscritTwo[miscritStat] == 0) setMiscritTwo({...miscritTwo, [miscritStat]: 1})
      else if (miscritTwo[miscritStat] == 1) setMiscritTwo({...miscritTwo, [miscritStat]: 2})
      else if (miscritTwo[miscritStat] == 2) setMiscritTwo({...miscritTwo, [miscritStat]: 0})
    }
    else if (miscrit == 3) {
      if (miscritThree[miscritStat] == 0) setMiscritThree({...miscritThree, [miscritStat]: 1})
      else if (miscritThree[miscritStat] == 1) setMiscritThree({...miscritThree, [miscritStat]: 2})
      else if (miscritThree[miscritStat] == 2) setMiscritThree({...miscritThree, [miscritStat]: 0})
    }
  }

  useEffect(() => {
    let resultProbabilities = calculateFusionRating()
    setProbabilities({...resultProbabilities});
  }, [miscritOne, miscritTwo, miscritThree])

  function calculateFusionRating() {
    // Posibles ratings
    const ratings = ["fminus", "f", "fplus", "d", "dplus", "c", "cplus", "b", "bplus", "a", "aplus", "s", "splus"];
    const ratingProbabilities = Array(13).fill(0);
  
    // Probabilidad de heredar cada estadística para la fusión
    const fusionStats = { hp: 0, sp: 0, ea: 0, ed: 0, pa: 0, pd: 0 };
    
    for (const stat in fusionStats) {
      const statValues = [miscritOne[stat], miscritTwo[stat], miscritThree[stat]];
      
      // Cuenta las veces que aparece cada valor (0, 1, 2)
      const counts = [0, 0, 0];
      statValues.forEach(value => counts[value]++);
      
      // Probabilidad de heredar cada valor para esta estadística
      fusionStats[stat] = counts.map(count => count / 3);
    }
  
    // Calcular la probabilidad de cada rating
    for (let hp = 0; hp < 3; hp++) {
      for (let sp = 0; sp < 3; sp++) {
        for (let ea = 0; ea < 3; ea++) {
          for (let ed = 0; ed < 3; ed++) {
            for (let pa = 0; pa < 3; pa++) {
              for (let pd = 0; pd < 3; pd++) {
                const totalPoints = hp + sp + ea + ed + pa + pd;
                const probability = fusionStats.hp[hp] * fusionStats.sp[sp] * fusionStats.ea[ea] * fusionStats.ed[ed] * fusionStats.pa[pa] * fusionStats.pd[pd];
                ratingProbabilities[totalPoints] += probability;
              }
            }
          }
        }
      }
    }
  
    // Convertir el array de probabilidades en un objeto
    const fusionRatingProbabilities = {};
    ratings.forEach((rating, index) => {
      fusionRatingProbabilities[rating] = ratingProbabilities[index];
    });
    return fusionRatingProbabilities;
  }

  return (
      <div className='calc-container'>
        <div className='miscrit miscrit-one'>
          <p className='card-number'>1</p>
          <button className={miscritOne.hp == 0 ? "red-stat" : miscritOne.hp == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(1,x)}>HP</button>
          <button className={miscritOne.sp == 0 ? "red-stat" : miscritOne.sp == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(1,x)}>SP</button>
          <button className={miscritOne.ea == 0 ? "red-stat" : miscritOne.ea == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(1,x)}>EA</button>
          <button className={miscritOne.ed == 0 ? "red-stat" : miscritOne.ed == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(1,x)}>ED</button>
          <button className={miscritOne.pa == 0 ? "red-stat" : miscritOne.pa == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(1,x)}>PA</button>
          <button className={miscritOne.pd == 0 ? "red-stat" : miscritOne.pd == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(1,x)}>PD</button>
          <p className='miscrit-rating-legend'>Your Miscrit: <span className={'miscrit-rating' + " " + miscritRatingText[Object.values(miscritOne).reduce((acc, value) => acc + value, 0)]}>{miscritRating[Object.values(miscritOne).reduce((acc, value) => acc + value, 0)]}</span></p>
        </div>
        <div className='miscrit miscrit-two'>
          <p className='card-number'>2</p>
          <button className={miscritTwo.hp == 0 ? "red-stat" : miscritTwo.hp == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(2,x)}>HP</button>
          <button className={miscritTwo.sp == 0 ? "red-stat" : miscritTwo.sp == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(2,x)}>SP</button>
          <button className={miscritTwo.ea == 0 ? "red-stat" : miscritTwo.ea == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(2,x)}>EA</button>
          <button className={miscritTwo.ed == 0 ? "red-stat" : miscritTwo.ed == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(2,x)}>ED</button>
          <button className={miscritTwo.pa == 0 ? "red-stat" : miscritTwo.pa == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(2,x)}>PA</button>
          <button className={miscritTwo.pd == 0 ? "red-stat" : miscritTwo.pd == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(2,x)}>PD</button>
          <p className='miscrit-rating-legend'>Your Miscrit: <span className={'miscrit-rating' + " " + miscritRatingText[Object.values(miscritTwo).reduce((acc, value) => acc + value, 0)]}>{miscritRating[Object.values(miscritTwo).reduce((acc, value) => acc + value, 0)]}</span></p>
        </div>
        <div className='miscrit miscrit-three'>
          <p className='card-number'>3</p>
          <button className={miscritThree.hp == 0 ? "red-stat" : miscritThree.hp == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(3,x)}>HP</button>
          <button className={miscritThree.sp == 0 ? "red-stat" : miscritThree.sp == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(3,x)}>SP</button>
          <button className={miscritThree.ea == 0 ? "red-stat" : miscritThree.ea == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(3,x)}>EA</button>
          <button className={miscritThree.ed == 0 ? "red-stat" : miscritThree.ed == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(3,x)}>ED</button>
          <button className={miscritThree.pa == 0 ? "red-stat" : miscritThree.pa == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(3,x)}>PA</button>
          <button className={miscritThree.pd == 0 ? "red-stat" : miscritThree.pd == 1 ? "white-stat" : "green-stat"} onClick={(x) => handleStats(3,x)}>PD</button>
          <p className='miscrit-rating-legend'>Your Miscrit: <span className={'miscrit-rating' + " " + miscritRatingText[Object.values(miscritThree).reduce((acc, value) => acc + value, 0)]}>{miscritRating[Object.values(miscritThree).reduce((acc, value) => acc + value, 0)]}</span></p>
        </div>
        <div className='result-container'>
          <p className='result-title'>Possible Results</p>
          <div className='rating-possibilities-container'>
            <p>S+: <span className={probabilities.splus > 0.4 ? "prob-high" : probabilities.splus > 0.3 ? "prob-mid" : probabilities.splus > 0.2 ? "prob-midlow" : ""}>{(probabilities.splus*100).toFixed(1)}%</span></p>
            <p>S: <span className={probabilities.s > 0.4 ? "prob-high" : probabilities.s > 0.3 ? "prob-mid" : probabilities.s > 0.2 ? "prob-midlow" : ""}>{(probabilities.s*100).toFixed(1)}%</span></p>
            <p>A+: <span className={probabilities.aplus > 0.4 ? "prob-high" : probabilities.aplus > 0.3 ? "prob-mid" : probabilities.aplus > 0.2 ? "prob-midlow" : ""}>{(probabilities.aplus*100).toFixed(1)}%</span></p>
            <p>A: <span className={probabilities.a > 0.4 ? "prob-high" : probabilities.a > 0.3 ? "prob-mid" : probabilities.a > 0.2 ? "prob-midlow" : ""}>{(probabilities.a*100).toFixed(1)}%</span></p>
            <p>B+: <span className={probabilities.bplus > 0.4 ? "prob-high" : probabilities.bplus > 0.3 ? "prob-mid" : probabilities.bplus > 0.2 ? "prob-midlow" : ""}>{(probabilities.bplus*100).toFixed(1)}%</span></p>
            <p>B: <span className={probabilities.b > 0.4 ? "prob-high" : probabilities.b > 0.3 ? "prob-mid" : probabilities.b > 0.2 ? "prob-midlow" : ""}>{(probabilities.b*100).toFixed(1)}%</span></p>
            <p>C+: <span className={probabilities.cplus > 0.4 ? "prob-high" : probabilities.cplus > 0.3 ? "prob-mid" : probabilities.cplus > 0.2 ? "prob-midlow" : ""}>{(probabilities.cplus*100).toFixed(1)}%</span></p>
            <p>C: <span className={probabilities.c > 0.4 ? "prob-high" : probabilities.c > 0.3 ? "prob-mid" : probabilities.c > 0.2 ? "prob-midlow" : ""}>{(probabilities.c*100).toFixed(1)}%</span></p>
            <p>D+: <span className={probabilities.dplus > 0.4 ? "prob-high" : probabilities.dplus > 0.3 ? "prob-mid" : probabilities.dplus > 0.2 ? "prob-midlow" : ""}>{(probabilities.dplus*100).toFixed(1)}%</span></p>
            <p>D: <span className={probabilities.d > 0.4 ? "prob-high" : probabilities.d > 0.3 ? "prob-mid" : probabilities.d > 0.2 ? "prob-midlow" : ""}>{(probabilities.d*100).toFixed(1)}%</span></p>
            <p>F+: <span className={probabilities.fplus > 0.4 ? "prob-high" : probabilities.fplus > 0.3 ? "prob-mid" : probabilities.fplus > 0.2 ? "prob-midlow" : ""}>{(probabilities.fplus*100).toFixed(1)}%</span></p>
            <p>F: <span className={probabilities.f > 0.4 ? "prob-high" : probabilities.f > 0.3 ? "prob-mid" : probabilities.f > 0.2 ? "prob-midlow" : ""}>{(probabilities.f*100).toFixed(1)}%</span></p>
            <p>F-: <span className={probabilities.fminus > 0.4 ? "prob-high" : probabilities.fminus > 0.3 ? "prob-mid" : probabilities.fminus > 0.2 ? "prob-midlow" : ""}>{(probabilities.fminus*100).toFixed(1)}%</span></p>
          </div>
        </div>
      </div>
  )
}

export default App
