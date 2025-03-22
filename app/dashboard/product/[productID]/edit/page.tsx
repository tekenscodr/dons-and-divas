import EditProduct from '@/app/components/EditProduct';
import React from 'react'

const page = (context: any) => {
  const { params } = context;

  return (
    <div>
      <EditProduct productID={params.productID} />
    </div>
  )
}

export default page
