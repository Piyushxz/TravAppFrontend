
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useFilter } from '../../../context/filter-context';

const minDifference = 500;
function valuetext(value) {
  return `${value}`;
}
export const PriceRange=()=> {

    const {priceRange,filterDispatch} = useFilter()
    const handlePriceChange = (event,newValue,activeThumb) =>{

        if(!Array.isArray(newValue)){
            return;
        }
        if(activeThumb === 0){
            filterDispatch({
                type:"MINIMUM_PRICE",
                payload:{
                    newValue,priceRange,minDifference
                }
            })
        }else{
            filterDispatch({
                type:"MAXIMUM_PRICE",
                payload :{
                    newValue,priceRange,minDifference
                }
            })
        }
    }
  return (
    <Box sx={{ width: 300 }}>
      <Slider
      className='price-range'
        getAriaLabel={() => 'Minimum Differecne'}
        value={priceRange}
       
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        min ={100}
        max={25000}
        disableSwap
        onChange={handlePriceChange}
      />
    </Box>
  );
}