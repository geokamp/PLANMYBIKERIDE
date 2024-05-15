import React from 'react'

export default function EvaluateRoute(rain, rain2, middleRain, middleStartRain, middleEndRain, windspeed, windspeed2, middleWind, middleStartWind, middleEndWind, visib, visib2, middleVisib, middleStartVisib, middleEndVisib) {


    // Function to calculate the average of an array of values
    const calculateAverageRating = (data) => {
        if (data.length === 0) return 0;
        const sum = data.reduce((total, rating) => total + rating, 0);
        return sum / data.length;
      };
      
      // Function to calculate the maximum value in an array
      const calculateMax = (values) => {
          return Math.max(...values);
      }

      const calculatePoints = (averageRating, ranges) => {
        for (const range of ranges) {
          if (averageRating >= range.min && averageRating <= range.max) {
            return range.points;
          }
        }
        return 0; // Default to 0 points if rating falls outside of predefined ranges
      };
   
    const rainLevels = rain.concat(rain2, middleRain, middleStartRain, middleEndRain);
        const windLevels= windspeed.concat(windspeed2, middleWind, middleStartWind, middleEndWind);
        const visibilityLevels = visib.concat(visib2, middleVisib, middleStartVisib, middleEndVisib);

        const combinedRain= [
          ...rainLevels.slice(0, -1)];
        const combinedWind= [
          ...windLevels.slice(0, -1)];
        const combinedVisib= [ ...visibilityLevels.slice(0, -1)];
        
        const rainRanges = [
          { min: 0, max: 0.05, points: 2 },   // Low impact rain
          { min: 0.05, max: 0.1, points: 1 },   // Moderate impact rain
          { min: 0.1, max: 0.9, points: 0 }   // High impact rain
        ];
      
        const windRanges = [
          { min: 39, max: 100, points: 0 },   
          { min: 15, max: 38, points: 1 },   
          { min: 0, max: 15, points: 2 }   
        ];
      
        const visibilityRanges = [
          { min: 4000, max: 50000, points: 2 },   // Excellent visibility
          { min: 3000, max: 3999, points: 1 },   // Moderate visibility
          { min: 0, max: 2999, points: 0 }   // Poor visibility
        ];

        const averageRainRating = calculateAverageRating(rainLevels);
        const averageWindRating = calculateMax(windLevels);
        const averageVisibilityRating = calculateAverageRating(visibilityLevels);
          


          const rainPoints = calculatePoints(averageRainRating, rainRanges);
          const windPoints = calculatePoints(averageWindRating, windRanges);
          const visibilityPoints = calculatePoints(averageVisibilityRating, visibilityRanges);
        
          // Calculate total score for the route
          const totalScore = rainPoints + windPoints + visibilityPoints;
          const percentage = Math.round((totalScore/6)*100);
          return percentage + "%";
    
    
          
}
