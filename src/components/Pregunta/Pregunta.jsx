import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pregunta.module.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { getDataByCategoty, getDataPregunStatus, getDatoPregSelect, selectAllDataPregun } from '../../redux/Slices/dataSlice';
import { nanoid } from '@reduxjs/toolkit';
import { Skeleton } from '@mui/material';


const Pregunta = () => {
  
  const datosPregSelec=useSelector(getDatoPregSelect);
  const datosStatus=useSelector(getDataPregunStatus);
  const datosPreg=useSelector(selectAllDataPregun)
  const datosPregCatego=useSelector(getDataByCategoty);
  const dispatch=useDispatch();
  const skeleNot=<div>
          <Skeleton variant="rectangular"  height={30} style={{marginBottom:"10px"}}></Skeleton>
          <Skeleton variant="rectangular"  height={30} style={{marginBottom:"10px"}}></Skeleton>
          <Skeleton variant="rectangular"  height={30} style={{marginBottom:"10px"}}></Skeleton>
          <Skeleton variant="rectangular"  height={30} style={{marginBottom:"10px"}}></Skeleton>
          <Skeleton variant="rectangular"  height={30} style={{marginBottom:"10px"}}></Skeleton>
          </div>

  function createMarkup(text) {
    return {__html: text};
  }

  return (
  <div>
    { datosStatus==="loading" || datosStatus==="idle"? skeleNot:
       Object.entries(datosPregSelec).map((element, index) => {
       //console.log(element)
        return(
          <Accordion data-testid="Pregunta" key={nanoid()}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.tituloPreg}>{element[1].pregunta}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography dangerouslySetInnerHTML={createMarkup(element[1].respuesta)}>
          
              </Typography>
            </AccordionDetails>
        </Accordion>
        ) 
            
        }) 
      }
  </div>
)};

Pregunta.propTypes = {};

Pregunta.defaultProps = {};

export default Pregunta;
