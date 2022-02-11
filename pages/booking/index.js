import dynamic from 'next/dynamic'
import withAuth from '../../HOC/withAuth'
import { FaPlane, FaShip } from 'react-icons/fa'
import Link from 'next/link'

const Booking = () => {
  return (
    <div className='mt-1'>
      <div className='px-2'>
        <h1 className='display-6 text-center font-monospace'>
          Book A New Shipment
        </h1>

        <p className='text-center'>
          Please select your preferred mode of transportation
        </p>

        <div className='row g-3 mt-3'>
          <div className='col-md-4 col-12 mx-auto'>
            <Link href='/booking/ocean'>
              <a className='text-dark text-decoration-none'>
                <div className='card text-center rounded-0 shadow'>
                  <FaShip className='card-img-top fs-1 mt-2' />
                  <div className='card-body'>
                    <h1 className='card-title fs-4'>OCEAN</h1>
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className='col-md-4 col-12 mx-auto'>
            <Link href='/booking/air'>
              <a className='text-dark text-decoration-none'>
                <div className='card text-center rounded-0 shadow'>
                  <FaPlane className='card-img-top fs-1 mt-2' />
                  <div className='card-body'>
                    <h1 className='card-title fs-4'>AIR</h1>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Booking)), { ssr: false })
