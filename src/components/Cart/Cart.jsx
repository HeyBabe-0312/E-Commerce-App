import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'

import useStyles from './styles'
import CartItem from './CartItem/CartItem'
import {Link} from 'react-router-dom'

const Cart = ({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {

    const classes = useStyles();

    const EmptyCard = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart,
            <Link to='/' className={classes.link}> start adding some</Link>!
        </Typography>
    );

    const FilledCard = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item key={item.id} xs={12} sm={4}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link} to='/checkout' className={classes.checkOutButton} size='large' type='button' variant='contained' color='primary'>Check Out</Button>
                </div>
            </div>
        </>
    );

    if(!cart.line_items) return 'Loading...';
  return (
    <Container>
        <div className={classes.toolbar}/>
        <Typography className={classes.title} variant='h4' gutterBottom>Your Shopping Cart</Typography>
        {!cart.line_items.length  ? <EmptyCard/>:<FilledCard/>}
    </Container>
  )
}

export default Cart