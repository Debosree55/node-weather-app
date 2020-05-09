const ex=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./src/utils/geocode')
const forecast=require('./src/utils/forecast')

const app=ex()
const port=process.env.PORT || 8080

const aboutDirctoryPath=path.join(__dirname, 'public/')
const viewspath=path.join(__dirname, 'templete/views/')
const partialPath=path.join(__dirname, 'templete/partials/')

app.use(ex.static(aboutDirctoryPath))

app.set('view engine','hbs')
app.set('views', viewspath)
hbs.registerPartials(partialPath)

//various routing
app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        body: 'Home page'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About the pages',
        body: 'Welcome to about page !!'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'help the pages',
        body: 'Welcome to Help page !!'
    })
})
//weather apps
app.get('/Weather', (req,res) =>{
   if(!req.query.address){
       return res.send({
        errorMessage: 'please provide a search critetia !!'
       })
   
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.render('404',{
                body: 'Error with page can not be found'
            })

        }
        forecast(latitude,longitude, (error, temparature)=>{
            if(error){
                return res.render('404.hbs',{
                    body: 'Error with page can not be found'
                })

            }
            res.send({
                location: req.query.address,
                forecast: temparature +' C',
                address: req.query.address
            })
        })
        
    })
})    

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title: 'Help page error',
        body: 'Help articles not available'
    })
}) 


app.get('*',(req,res) =>{
    res.render('404',{
        title: 'Error page',
        body: 'Page not available'
    })
})

app.listen(port, ()=>
{
    console.log('from port' +port + '!!')
})
