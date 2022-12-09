import express, { 
  NextFunction, 
  Request, 
  Response 
} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IUserInputDTO } from '../interfaces/IUser'
import { UserService } from '../service'

const signUp = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {

  req.body.password = '1234'
  const { name, email, password } : IUserInputDTO = req.body

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const createdUser = await UserService.createUser({ name, email, password: hashedPassword })

  const payload = {
    user: {
      email: createdUser.email,
    },
  }

  jwt.sign(
    payload,
    'jwtscret', // config
    { expiresIn: 36000},
    (err, token) => {
      if(err) throw err
      res.json({token})
    }
  )
}

const logIn = async (
  req: Request,
  res: Response, 
  next: NextFunction
) => {
  try{
    const { email, password } = req.body
    const user = await UserService.findUserById({ email })

    if(!user){
      console.log('email을 찾을 수 없음.')
    }

    // const isMatch = await bcrypt.compare(password, user.password)
    // if(!isMatch){
    //   console.log('비밀번호가 틀렸습니다.')
    // }

    // const payload = {
    //   user: {
    //     email: user.email,
    //   },
    // }
  } catch(err) {
    next(err)
  }
}

export default {
  signUp,
  logIn,
}