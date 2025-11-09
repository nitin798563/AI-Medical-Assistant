"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog'
import { ArrowRight, Loader, Loader2 } from 'lucide-react'
import axios from 'axios'
import type { doctorAgent } from './DoctorAgentCard'
import DoctorAgentCard from './DoctorAgentCard'
import SugggestedDoctorCard from './SugggestedDoctorCard'

const AddNewSessionDailog = () => {
  const [note, setNote] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();

  const onClickNext = async () => {
    setLoading(true);
    const result = await axios.post('/api/suggest-doctors',
      {
        notes: note

      });
    console.log("Suggested Doctors:", result.data);
    setSuggestedDoctors(result.data);
    setLoading(false);

  }

  const onStartConsultation =  async () => {
    setLoading(true);
    // save all Info to database

    const result = await axios.post('/api/session-chat', {
      notes: note,
      selectedDoctor: selectedDoctor
    });

    console.log("New Session Created:", result.data);


    if (result.data?.sessionId) {
      console.log(result.data.sessionId)

      // redirect to chat page
    }
    setLoading(false);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className='mt-3'>+ Start Consultation</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Basic Details</DialogTitle>
            <DialogDescription asChild>
              {!suggestedDoctors ? <div>
                <h2>Add Symptoms or Any Other Details</h2>
                <Textarea placeholder='Add Details here...' className='h-[200px] mt-2'
                  onChange={(e) => setNote(e.target.value)}
                />
              </div> :
                <div>
                  <h2>Select the doctor</h2>
                  <div className='grid grid-cols-3 gap-5'>


                    {/* If suggested doctors are available, show them */}
                    {suggestedDoctors.map((doctor, index) => (

                      <SugggestedDoctorCard doctorAgent={doctor} key={index}
                        setSelectedDoctor={() => setSelectedDoctor(doctor)}
                        //@ts-ignore
                        selectedDoctor={selectedDoctor}/>
                    ))}

                  </div>
                </div>}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            {!suggestedDoctors ?
              <Button disabled={!note || loading} onClick={() => onClickNext()}>
                Next  {loading ? <Loader2 className='animate-spin' /> : <ArrowRight />} </Button>
              : <Button disabled={loading || !selectedDoctor} onClick={() => onStartConsultation()}>Start Consultation
               {loading ? <Loader2 className='animate-spin' /> : <ArrowRight />}</Button>}

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewSessionDailog