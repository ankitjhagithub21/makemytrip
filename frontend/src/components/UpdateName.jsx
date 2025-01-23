import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { setUser } from '../redux/slices/userSlice'
import { changeName } from '../api/user'
import { useDispatch } from 'react-redux'

const UpdateName = ({user}) => {
  
    const dispatch = useDispatch()
    const [fullName,setFullName] = useState(user?.fullName)
    const [loading,setLoading] = useState(false)
    const handleNameChange = async (e) => {
      e.preventDefault();
      setLoading(true)
        try {
            const data = await changeName(fullName)
          dispatch( setUser({ ...user, fullName: data.fullName }))
            toast.success("Name changed successfully.");
            document.getElementById('my_modal_2').close();
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
          setLoading(false)
        }
    }

  return (
    <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
      <h3 className="font-semibold text-lg mb-3">Change Name</h3>
     <form onSubmit={handleNameChange} className='flex gap-2'>
        <input type="text" value={fullName} className='input w-full input-success'  onChange={(e)=>setFullName(e.target.value)} required/>
        <button className='btn btn-success' disabled={loading} type='submit'>
          {
            loading && <span className="loading loading-spinner"></span>
          }
          Change</button>
     </form>
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
  )
}

export default UpdateName