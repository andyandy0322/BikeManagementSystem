import { Box, Checkbox, Button, Container, FormControlLabel, FormGroup, Input, Modal, TextField, Typography, Alert } from '@mui/material';
import {useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '@/styles/addBike.css'
import { useRouter } from 'next/router';

export default function addBike(){

    const router = useRouter();
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) => {  
        const newArray = check.filter((n) => n !== ''); 

        //adding state to JS Object
        data.category = newArray;

        //String to array
        let oldColors = data['colors'];
        let newColors = oldColors.split(", ")
        data.colors = newColors;

        //Fixing Color array
        const newArray2 = data['colors'].filter((n) => n !== '');
        data.colors = newArray2;
    

        //Fields that cannot be handled by Spring Boot Validation
         if (data.category.length === 0 || data.colors.length === 0){
            let errorArray = [];
            errorArray.push("No chosen Categories or Colors for the Bike!")
            displayResults(errorArray);
            setError(true);
            return;
         }

        axios.post("http://localhost:8000/api/makeBike", data)
        .then(res => {
            console.log(res.data.result);
        
             if (!res.data.result.includes("Successfully")){
                displayResults(res.data.result);
                setError(true);
                return;
            }
            else {
                console.log('good');
                router.push("http://localhost:3000/bikes")
                return;
            }
            
        })
    }

    //MODAL
    const [check, setCheck ] = useState(['']);
    const [modal, setModal] = useState(false);
    const [result, setResult] = useState(<></>);
    const [error, setError] = useState(false);

    //Getting Query of Categories
    const catQuery = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            return axios.get("http://localhost:8000/api/getCategories")
            .then(res => {return res.data})
        }
    })

    //handling checkbox
    function checkChange(value, isChecked){
        if (isChecked){
            setCheck([...check, value])
        } else {
            setCheck(check.filter((category) => category != value))
        }
    }
    
    //For results of POST
    function displayResults(data){
        console.log(data)
        let displayString = <></>;
        displayString = 
                
                data?.map((errors) => {
                    return <>
                    <br/>
                        <Alert severity='error' style={{margin: 'auto', maxWidth: '50vw'}}> {errors} </Alert>
                    </>
                })
                
        
        setResult(displayString);
    }

    return(
        <>
        
        <Modal
        // className='modal'
        disableScrollLock={true}
        open = {error === true}
        onClose={() => {setError(false)}}
        >
            <Container>
                {result}
            </Container>
        </Modal>
        
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container style={{marginTop: '15vh', width: '50vw', maxWidth: '50vw'}}>
                <Typography variant='h4'> Add a Bike </Typography>
                <Typography variant='h6' style={{marginTop: '3vh'}}>
                    Name
                </Typography>
                <Input {...register("name")} style={{minWidth: '40vw'}} />

                <Typography variant='h6' style={{marginTop: '3vh'}}>
                    Description
                </Typography> <br/>
                <TextField rows={2} {...register("description")} multiline variant='filled' label="Description about the bike" style={{minWidth: '40vw'}}  />

                <Typography variant='h6' style={{marginTop: '3vh'}}>
                    Price
                </Typography>
                <Input {...register("price")} style={{minWidth: '40vw'}}  />

                <Typography variant='h6' style={{marginTop: '3vh'}}>
                   Stock
                </Typography>
                <Input {...register("stock")} style={{minWidth: '40vw'}}  />

                <Typography variant='h6' style={{marginTop: '3vh'}}>
                    Wheel Size
                </Typography>
                <Input {...register("wheelSize")} style={{minWidth: '40vw'}}  />

                <Typography variant='h6' style={{marginTop: '3vh'}}>
                    Colors (Separate words with "," then a space)
                </Typography>
                <Input {...register("colors")} style={{minWidth: '40vw'}}  />

                <Button 
                    variant='contained' 
                    style={{marginTop: '4vh'}}
                    onClick={() => {setModal(true)}}> 
                        Select Categories
                </Button>
                <Button type='submit' variant='contained' style={{float: 'right', marginTop: '4vh'}}> Create </Button>
                <Button variant='contained' onClick={() => {router.push("http://localhost:3000/bikes")}} style={{float: 'right', marginTop: '4vh', marginRight: '2vw', backgroundColor: 'red'}}> Cancel </Button>
                
                <Modal
                open={modal === true}
                onClose = {() => setModal(false)}
                disableScrollLock={true}
                >
                    <Box className='modal'>
                        {
                            catQuery?.data?.map((category) => {
                                return(
                                    <>
                                        <FormGroup>
                                            {
                                                check.includes(category.name) ? (
                                                    <FormControlLabel onChange={(event) => {checkChange(event.target.value, event.target.checked)} } control={<Checkbox defaultChecked />} defaultValue={category.name} value={category.name} label={category.name} />
                                                ) : (
                                                    <FormControlLabel onChange={(event) => {checkChange(event.target.value, event.target.checked)} } control={<Checkbox />} defaultValue={category.name} value={category.name} label={category.name} />
                                                )   
                                            }
                                        </FormGroup>
                                    </>
                                )
                            })
                        }
                    </Box>

                </Modal>

                <br/><br/>
            </Container>
        </form>
        </>
    )
}