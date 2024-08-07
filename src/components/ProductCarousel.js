import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../sagaActions/sagaProductAction'

const ProductCarousel = () => {
    const dispatch = useDispatch()
    const productTopRated = useSelector(state=>state.productTopRated)
    const {loading, error, products} = productTopRated

    console.log(products)
    useEffect(()=>{
        dispatch(listTopProducts())
    }, [dispatch])

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
  : 
  (<Carousel pause='hover' className='bg-dark'>
    {products.length!==0 && products.map(product=>(
        <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className='carousel-caption'>
                    <h2>{product.name} ({`\u20B9 `}{product.price})</h2>
                </Carousel.Caption>
            </Link>
        </Carousel.Item>
    ))}
  </Carousel>)
}

export default ProductCarousel
