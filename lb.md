  // when Langbase works

  // const data = {
  //   messages: [{ role: 'user', content: prompt }],
  //   variables: [{ name: 'CODEBASE', value: readCodebaseFile() }],
  // }

  // logger.debug(data, '>>> data')

  // response.

  // if (!response.ok) {
  //   return streamErrorCompletion(prompt)
  // }

  // const reader = response.body.getReader()
  // const decoder = new TextDecoder('utf-8')

  // return new Repeater<ChatCompletion>(async (push, stop) => {
  //   // eslint-disable-next-line no-constant-condition
  //   while (true) {
  //     const { done, value } = await reader.read()
  //     if (done) {
  //       stop()
  //       break
  //     }
  //     const chunk = decoder.decode(value)
  //     const lines = chunk.split('\n').filter((line) => line.trim() !== '')

  //     for (const line of lines) {
  //       if (line.startsWith('data:')) {
  //         const data = line.substring('data:'.length).trim()
  //         if (data === '[DONE]') {
  //           stop()
  //           break
  //         }
  //         try {
  //           const json = JSON.parse(data)
  //           if (json.choices[0]?.delta?.content) {
  //             const content = json.choices[0].delta.content
  //             const chatCompletion = {
  //               id: '1',
  //               threadId: '1',
  //               message: content,
  //               prompt,
  //             }
  //             console.debug(chatCompletion, 'Publish chat chunk')
  //             push(chatCompletion)
  //           }
  //         } catch (error) {
  //           logger.warn({ error, data }, 'Error parsing JSON chunk')
  //         }
  //       }
  //     }
  //   }

  //   stop.then(() => {
  //     logger.debug('cancel')
  //   })
  // })
}
